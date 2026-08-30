document.getElementById('calcBtn').addEventListener('click', function(){
  var length = parseFloat(document.getElementById('length').value) || 0;
  var width  = parseFloat(document.getElementById('width').value) || 0;
  var thicknessIn = parseFloat(document.getElementById('thickness').value) || 0;
  var yieldPerBag = parseFloat(document.getElementById('bagsize').value);

  var thicknessFt = thicknessIn / 12;
  var volumeCuFt = length * width * thicknessFt;
  var volumeCuYd = volumeCuFt / 27;
  var bags = volumeCuFt > 0 ? Math.ceil(volumeCuFt / yieldPerBag) : 0;

  document.getElementById('bagCount').textContent = bags + ' bags';
  document.getElementById('resultSub').textContent =
    'Total volume: ' + volumeCuFt.toFixed(2) + ' ft³ (' + volumeCuYd.toFixed(3) + ' yd³)';
  document.getElementById('result').classList.add('show');
});
