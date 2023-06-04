
let setYear = (function (currentYear) {
  document.getElementById('footerYear').textContent = currentYear;
})(new Date().getFullYear());