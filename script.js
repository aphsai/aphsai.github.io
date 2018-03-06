var overlay =   document.getElementById('loadingOverlay');
  overlay.style.height = overlay.clientHeight + "px";
window.onload = function() {
  overlay.innerHTML = '';
  var decrease = setInterval(function() {
    overlay.style.height = (parseInt(overlay.style.height) - 10) + "px";
    if (parseInt(overlay.style.height) <= 10) {
      clearInterval(decrease);
      overlay.remove();
    }
  }, 5);

  document.getElementsByTagName("html")[0].style.overflowY = "scroll";
}
