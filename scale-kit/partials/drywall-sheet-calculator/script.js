document.getElementById('calcBtn').addEventListener('click', function(){
  var wallArea = parseFloat(document.getElementById('wallarea').value) || 0;
  var sheetSize = parseFloat(document.getElementById('sheetsize').value);
  var waste = parseFloat(document.getElementById('waste').value) || 0;

  var rawSheets = sheetSize > 0 ? wallArea / sheetSize : 0;
  var sheets = Math.ceil(rawSheets * (1 + waste / 100));

  document.getElementById('mainResult').textContent = sheets + ' sheets';
  document.getElementById('resultSub').textContent = 'Covers ' + wallArea.toFixed(0) + ' ft\u00b2 of wall/ceiling';
  document.getElementById('result').classList.add('show');
});
