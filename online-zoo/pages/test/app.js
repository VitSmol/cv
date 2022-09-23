let oRangeWrap = document.querySelector('.range-wrap');
let oRangeText = oRangeWrap.querySelector('.range-text');
let aRangeVals = ['Today', '2 days', '3 days', '4 days', '5 days', '6 days', '7 days'];
document.querySelector('[type="range"]').addEventListener('input', function() {
  let nVal = this.value - 1;
  oRangeText.textContent = aRangeVals[nVal];
  oRangeWrap.style.setProperty('--left', `${(100 / 6) * nVal}%`);
  oRangeText.style.transform = `translatex(-${(100 / 6) * nVal}%)`;
});