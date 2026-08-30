document.getElementById('calcBtn').addEventListener('click', function(){
  var wallArea = parseFloat(document.getElementById('wallarea').value) || 0;
  var coats = parseFloat(document.getElementById('coats').value) || 1;
  var coverage = parseFloat(document.getElementById('coverage').value) || 350;

  var totalAreaToPaint = wallArea * coats;
  var gallons = coverage > 0 ? Math.ceil((totalAreaToPaint / coverage) * 4) / 4 : 0; // round to nearest quart

  document.getElementById('mainResult').textContent = gallons + ' gallons';
  document.getElementById('resultSub').textContent = 'Covers ' + totalAreaToPaint.toFixed(0) + ' ft\u00b2 total across ' + coats + ' coat(s)';
  document.getElementById('result').classList.add('show');
});
