document.getElementById('calcBtn').addEventListener('click', function(){
  var length = parseFloat(document.getElementById('length').value) || 0;
  var width  = parseFloat(document.getElementById('width').value) || 0;
  var depthIn = parseFloat(document.getElementById('depth').value) || 0;

  var areaSqFt = length * width;
  var volumeCuFt = areaSqFt * (depthIn / 12);
  var volumeCuYd = volumeCuFt / 27;
  var tons = volumeCuYd * 1.35; // avg loose topsoil density

  document.getElementById('mainResult').textContent = volumeCuYd.toFixed(2) + ' yd\u00b3';
  document.getElementById('resultSub').textContent = 'Approx. ' + tons.toFixed(2) + ' tons \u00b7 ' + volumeCuFt.toFixed(1) + ' ft\u00b3';
  document.getElementById('result').classList.add('show');
});
