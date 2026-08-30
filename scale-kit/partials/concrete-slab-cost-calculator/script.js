document.getElementById('calcBtn').addEventListener('click', function(){
  var length = parseFloat(document.getElementById('length').value) || 0;
  var width  = parseFloat(document.getElementById('width').value) || 0;
  var thicknessIn = parseFloat(document.getElementById('thickness').value) || 0;
  var pricePerYard = parseFloat(document.getElementById('priceperyard').value) || 0;

  var thicknessFt = thicknessIn / 12;
  var volumeCuFt = length * width * thicknessFt;
  var volumeCuYd = volumeCuFt / 27;
  var cost = volumeCuYd * pricePerYard;

  document.getElementById('mainResult').textContent = '$' + cost.toFixed(2);
  document.getElementById('resultSub').textContent =
    'Volume: ' + volumeCuYd.toFixed(3) + ' yd\u00b3 (' + volumeCuFt.toFixed(1) + ' ft\u00b3)';
  document.getElementById('result').classList.add('show');
});
