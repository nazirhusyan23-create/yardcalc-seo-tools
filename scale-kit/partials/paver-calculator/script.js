document.getElementById('calcBtn').addEventListener('click', function(){
  var length = parseFloat(document.getElementById('length').value) || 0;
  var width  = parseFloat(document.getElementById('width').value) || 0;
  var pLenIn = parseFloat(document.getElementById('paverlen').value) || 0;
  var pWidIn = parseFloat(document.getElementById('paverwid').value) || 0;
  var waste  = parseFloat(document.getElementById('waste').value) || 0;

  var areaSqFt = length * width;
  var paverAreaSqFt = (pLenIn * pWidIn) / 144;
  var rawCount = paverAreaSqFt > 0 ? areaSqFt / paverAreaSqFt : 0;
  var totalCount = Math.ceil(rawCount * (1 + waste / 100));

  document.getElementById('mainResult').textContent = totalCount + ' pavers';
  document.getElementById('resultSub').textContent =
    'Covers ' + areaSqFt.toFixed(1) + ' ft\u00b2 \u00b7 Paver area: ' + paverAreaSqFt.toFixed(3) + ' ft\u00b2 each';
  document.getElementById('result').classList.add('show');
});
