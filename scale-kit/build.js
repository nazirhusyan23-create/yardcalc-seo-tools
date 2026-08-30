/**
 * build.js
 * Generates one static, SEO-ready HTML page per tool listed in data/tools.json.
 * Run: node build.js
 *
 * Folder expectations:
 *   scale-kit/template/shell.html         -> shared page skeleton
 *   scale-kit/partials/<slug>/calculator.html
 *   scale-kit/partials/<slug>/article.html
 *   scale-kit/partials/<slug>/script.js
 *   scale-kit/data/tools.json             -> one entry per tool
 *
 * Output:
 *   ../tools/<slug>.html   (ready to deploy on Vercel)
 *   ../sitemap.xml         (regenerated from the same data)
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://yourdomain.com';
const ROOT = __dirname;
const OUT_TOOLS_DIR = path.join(ROOT, '..', 'tools');
const SHELL = fs.readFileSync(path.join(ROOT, 'template', 'shell.html'), 'utf8');
const tools = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'tools.json'), 'utf8'));

function buildSchema(tool, canonicalUrl) {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": tool.h1,
    "url": canonicalUrl,
    "description": tool.metaDescription,
    "inLanguage": "en-US",
    "isPartOf": { "@type": "WebSite", "name": "YardCalc", "url": SITE_URL },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": `${SITE_URL}/tools` },
        { "@type": "ListItem", "position": 3, "name": tool.breadcrumbName, "item": canonicalUrl }
      ]
    }
  };

  const softwareApp = tool.softwareApp ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.h1,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any (Web-based)",
    "url": canonicalUrl,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": tool.ratingValue ? {
      "@type": "AggregateRating",
      "ratingValue": tool.ratingValue,
      "ratingCount": tool.ratingCount || "1"
    } : undefined
  } : null;

  const faqPage = tool.faq && tool.faq.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  } : null;

  const blocks = [webPage, softwareApp, faqPage].filter(Boolean);
  return blocks
    .map(b => `<script type="application/ld+json">\n${JSON.stringify(b, null, 2)}\n</script>`)
    .join('\n');
}

function buildFaqHtml(faq) {
  return (faq || []).map(f => `
      <details>
        <summary>${f.q}</summary>
        <p>${f.a}</p>
      </details>`).join('\n');
}

function buildRelatedHtml(related) {
  return (related || []).map(r => `<li><a href="${r.href}">${r.label}</a></li>`).join('\n          ');
}

function readPartial(slug, filename) {
  const p = path.join(ROOT, 'partials', slug, filename);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
}

function renderTool(tool) {
  const canonicalUrl = `${SITE_URL}/tools/${tool.slug}`;
  const calculatorHtml = readPartial(tool.slug, 'calculator.html');
  const articleHtml = readPartial(tool.slug, 'article.html');
  const scriptJs = readPartial(tool.slug, 'script.js');

  let html = SHELL
    .replaceAll('{{TITLE}}', tool.title)
    .replaceAll('{{META_DESCRIPTION}}', tool.metaDescription)
    .replaceAll('{{CANONICAL_URL}}', canonicalUrl)
    .replaceAll('{{BREADCRUMB_NAME}}', tool.breadcrumbName)
    .replaceAll('{{EYEBROW}}', tool.eyebrow)
    .replaceAll('{{H1}}', tool.h1)
    .replaceAll('{{LEDE}}', tool.lede)
    .replaceAll('{{SCHEMA_JSONLD}}', buildSchema(tool, canonicalUrl))
    .replaceAll('{{CALCULATOR_HTML}}', calculatorHtml)
    .replaceAll('{{ARTICLE_HTML}}', articleHtml)
    .replaceAll('{{FAQ_HTML}}', buildFaqHtml(tool.faq))
    .replaceAll('{{RELATED_LINKS_HTML}}', buildRelatedHtml(tool.related))
    .replaceAll('{{INLINE_SCRIPT}}', scriptJs);

  return html;
}

function buildSitemap(tools) {
  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0' },
    { loc: `${SITE_URL}/tools`, priority: '0.9' },
    ...tools.map(t => ({ loc: `${SITE_URL}/tools/${t.slug}`, priority: '0.8' }))
  ];
  const body = urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

// --- run ---
if (!fs.existsSync(OUT_TOOLS_DIR)) fs.mkdirSync(OUT_TOOLS_DIR, { recursive: true });

tools.forEach(tool => {
  const html = renderTool(tool);
  const outPath = path.join(OUT_TOOLS_DIR, `${tool.slug}.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Built:', outPath);
});

const sitemap = buildSitemap(tools);
fs.writeFileSync(path.join(ROOT, '..', 'sitemap.xml'), sitemap, 'utf8');
console.log('Sitemap regenerated.');
