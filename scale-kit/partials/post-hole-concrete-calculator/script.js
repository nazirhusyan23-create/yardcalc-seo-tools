document.getElementById('calcBtn').addEventListener('click', function(){
  var diaIn = parseFloat(document.getElementById('diameter').value) || 0;
  var depthIn = parseFloat(document.getElementById('depth').value) || 0;
  var numHoles = parseFloat(document.getElementById('numholes').value) || 0;
  var yieldPerBag = parseFloat(document.getElementById('bagsize').value);

  var radiusIn = diaIn / 2;
  var volumePerHoleCuIn = Math.PI * radiusIn * radiusIn * depthIn;
  var volumePerHoleCuFt = volumePerHoleCuIn / 1728;
  var totalVolumeCuFt = volumePerHoleCuFt * numHoles;
  var bags = totalVolumeCuFt > 0 ? Math.ceil(totalVolumeCuFt / yieldPerBag) : 0;

  document.getElementById('mainResult').textContent = bags + ' bags';
  document.getElementById('resultSub').textContent =
    'Total volume: ' + totalVolumeCuFt.toFixed(2) + ' ft\u00b3 across ' + numHoles + ' hole(s)';
  document.getElementById('result').classList.add('show');
});
