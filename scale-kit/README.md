# YardCalc SEO Scaling Kit

Is folder se aap unlimited calculator pages banate ho, bina har baar poora HTML dobara likhe.

## Folder structure

```
site/
├── tools/                      ← FINAL pages yahan generate hoti hain (Vercel deploy ke liye)
│   └── concrete-bag-calculator.html
├── sitemap.xml                 ← auto-generated
├── robots.txt
└── scale-kit/
    ├── template/shell.html     ← shared skeleton (header, footer, ad slots, schema wiring)
    ├── site.css                ← shared stylesheet (link it from /assets/site.css on deploy)
    ├── data/tools.json         ← 1 JSON object per tool = 1 page
    ├── partials/<slug>/
    │   ├── calculator.html     ← tool-specific inputs/UI
    │   ├── article.html        ← tool-specific unique content
    │   └── script.js           ← tool-specific calculation logic
    └── build.js                ← run this to generate everything
```

## Naya tool add karna (3 steps)

1. `scale-kit/partials/<new-slug>/` folder banao with `calculator.html`, `article.html`, `script.js`.
2. `scale-kit/data/tools.json` mein ek naya object add karo (title, meta description, FAQ, related links).
3. Run: `node build.js` — ye `tools/<slug>.html` aur `sitemap.xml` dono generate/update kar dega.

Har page automatically get karta hai: same header/footer, same ad slot layout, same WebPage+SoftwareApplication+FAQPage schema (data se auto-built), same performance-optimized CSS. Aapko sirf **unique calculator + unique content** likhna hai — yehi Google ke liye asli "unique value" hai.

## Keyword research process (low-DR, un-trapped keywords)

1. Ahrefs Keywords Explorer (ya free alternative: Ubersuggest, Keywords Everywhere) mein apni niche ka seed keyword daalo (e.g. "concrete calculator").
2. "Keyword Difficulty" filter: 0–10 rakho.
3. SERP overview kholo aur top 10 results ki Domain Rating dekho — agar top 5 mein 2-3 sites DR 0-20 wali hain (aur wo koi mega-brand nahi), ye keyword "un-trapped" hai.
4. Agar top 10 sab DR 70+ (Omni Calculator, Calculator.net, big blogs) se bhara hai — chhod do, ye "trapped" keyword hai.
5. Long-tail variations nikalo: "concrete bag calculator", "how many 80lb bags per yard", "concrete calculator for post holes" — ye sab alag standalone pages ban sakte hain (page-splitting strategy).
6. "Traffic potential" 50-500/month wale keywords early-stage site ke liye best hain — realistic aur achievable.

## Suggested first 15 pages (same niche cluster → strong internal linking)

- concrete-bag-calculator
- concrete-slab-cost-calculator
- post-hole-concrete-calculator
- gravel-calculator
- paver-calculator
- mulch-calculator
- topsoil-calculator
- fence-post-spacing-calculator
- deck-board-calculator
- paint-coverage-calculator
- drywall-sheet-calculator
- flooring-square-footage-calculator
- roofing-square-calculator
- retaining-wall-block-calculator
- sod-calculator

Sab ek hi "home & construction materials" niche cluster mein hain — Google inhe topically related content dekh kar poore cluster ko authority deta hai (topical relevance signal), aur har page dusre page ko internally link kar sakta hai ("Related Calculators" sidebar already isi liye design ki gayi hai).

## Deploy checklist (Vercel)

- [ ] `yourdomain.com` ko har file mein replace karo (title, canonical, schema `url` fields, sitemap, privacy/terms/about/contact).
- [ ] `about.html`, `privacy-policy.html`, `terms.html`, `contact.html` mein `[BRACKETED]` placeholders (email, business name, real bio) fill karo — **yeh AdSense reviewers manually padhte hain**, generic/fake text reject ho sakta hai.
- [ ] `/assets/site.css` already wired hai shell template se.
- [ ] Google Search Console mein property add karo (domain verify), `sitemap.xml` submit karo — yeh manual step hai, koi tool automatically submit nahi kar sakta.
- [ ] AdSense apply karne se pehle: kam se kam 10-15 real, indexed pages ho (Search Console mein "Indexed" status check karo), sab pages original content ke sath.
- [ ] `ads.txt` mein apna real `pub-XXXXXXXXXXXXXXXX` daalo (AdSense approval ke baad account se milta hai) — approval se pehle bhi ye file honi chahiye taake verification fail na ho.
- [ ] Footer/header links (`/privacy-policy`, `/terms`, `/about`, `/contact`) sab pages se accessible hone chahiye — AdSense navigation/policy pages check karta hai.
- [ ] EU/UK traffic expect karte ho to ek cookie-consent banner add karo (Google's "EU User Consent Policy" ke liye required hai jab tak sirf non-personalized ads na serve kar rahe ho) — yeh kit mein shamil nahi hai, alag se add karna hoga (e.g. CookieYes free tier).
- [ ] Core Web Vitals check: yeh site vanilla HTML/CSS/JS hai, koi framework/build step nahi — Vercel par static hosting se load time <1s rehna chahiye.

## Monetization credibility — honest status

Ye kit AdSense apply karne ke liye **technical baseline** deta hai (privacy policy, terms, about, contact, ads.txt, schema, clean URLs). Lekin approval guarantee koi bhi kit nahi de sakta — Google manually review karta hai:
- Content depth aur originality (1 page kaafi nahi, 10-15+ chahiye)
- Real ownership info (fake/placeholder About page reject ho sakta hai)
- Site navigation aur no broken links
- Traffic/policy compliance history

Search Console verification aur AdSense application khud submit karni padegi — yeh dono Google account access maangte hain jo koi third-party tool (including AI assistants) aapki taraf se nahi kar sakta.
