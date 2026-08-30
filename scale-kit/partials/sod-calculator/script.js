document.getElementById('calcBtn').addEventListener('click', function(){
  var length = parseFloat(document.getElementById('length').value) || 0;
  var width  = parseFloat(document.getElementById('width').value) || 0;
  var waste  = parseFloat(document.getElementById('waste').value) || 0;

  var rawArea = length * width;
  var totalArea = rawArea * (1 + waste / 100);
  var pallets = totalArea > 0 ? Math.ceil(totalArea / 450) : 0; // ~450 sqft per pallet
  var pieces = totalArea > 0 ? Math.ceil(totalArea / 9) : 0;    // ~9 sqft per roll/slab

  document.getElementById('mainResult').textContent = pallets + ' pallets';
  document.getElementById('resultSub').textContent =
    'Approx. ' + pieces + ' individual pieces \u00b7 ' + totalArea.toFixed(0) + ' ft\u00b2 total';
  document.getElementById('result').classList.add('show');
});
