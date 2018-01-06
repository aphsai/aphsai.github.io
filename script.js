window.onload = function setup() {
  function response() {
    var x = document.getElementById("nav");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
  }
    document.getElementById("menubtn").onclick = response();
}
