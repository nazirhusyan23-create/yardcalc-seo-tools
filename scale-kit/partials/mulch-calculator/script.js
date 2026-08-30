document.getElementById('calcBtn').addEventListener('click', function(){
  var length = parseFloat(document.getElementById('length').value) || 0;
  var width  = parseFloat(document.getElementById('width').value) || 0;
  var depthIn = parseFloat(document.getElementById('depth').value) || 0;
  var bagSize = parseFloat(document.getElementById('bagsize').value);

  var areaSqFt = length * width;
  var volumeCuFt = areaSqFt * (depthIn / 12);
  var volumeCuYd = volumeCuFt / 27;
  var bags = volumeCuFt > 0 ? Math.ceil(volumeCuFt / bagSize) : 0;

  document.getElementById('mainResult').textContent = volumeCuYd.toFixed(2) + ' yd\u00b3';
  document.getElementById('resultSub').textContent = 'Approx. ' + bags + ' bags (' + volumeCuFt.toFixed(1) + ' ft\u00b3 total)';
  document.getElementById('result').classList.add('show');
});
