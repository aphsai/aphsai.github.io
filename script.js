var audio = new Audio();
audio.loop = true;
audio.autoplay = true;
audio.setAttribute("style","display:none;");
var canvas, ctx, source, context, analyzer, fbc_array, bars, bar_x, bar_width, bar_height, triangles = [], squares = [], circles = [];
function createTriangle(x , y, check) {
  var triangle = document.createElement("div");
  var size = 2 + Math.floor(Math.random() * 5);
  var posX = Math.floor(Math.random()*x);
  var posY = Math.floor(Math.random()*y);
  if (check == true) {
    posY = Math.floor(Math.random()*y + y);
  }
  triangle.setAttribute("style","width: 0; height: 0; border-left: " + 10 * size + "px solid transparent;  border-right: " + 10*size + "px solid transparent; border-bottom:" + size*17 + "px solid #111; position:absolute; top:" + posY + "px; left:" + posX  + "px;")
  triangle.setAttribute("data-speed", 1/(size/7) * 30);
  triangle.setAttribute("data-hex", '#'+(Math.random()*0xFFFFFF<<0).toString(16));
  triangle.style.animationDuration = 5 * 1/(size/7)  + "s";
  triangle.style.opacity = 0.1 + 0.8 * Math.random();
  triangle.className = "triangle";
  return triangle;
}
window.onload = function init() {
  document.getElementById("audio_file").onchange = function() {
    var files = this.files;
    var file = URL.createObjectURL(files[0]);
    audio.src = file;
    audio.play();
  }
  document.getElementById('container').appendChild(audio);
  context = new AudioContext();
  analyzer = context.createAnalyser();
  analyzer.smoothingTimeConstant = 0.8;
  canvas = document.getElementById('analyzer');
  canvas.setAttribute("width", document.body.getBoundingClientRect().width + "px");
  canvas.setAttribute("height", document.body.getBoundingClientRect().height + "px");
  canvas.setAttribute("overflow", "hidden");
  // canvas.setAttribute("style","height:" + document.body.getBoundingClientRect().height + "px; width:" + document.body.getBoundingClientRect().width + "px;");
  ctx = canvas.getContext('2d');
  source = context.createMediaElementSource(audio);
  source.connect(analyzer);
  analyzer.connect(context.destination);
  for (var x = 0; x < 50; x++) {
    document.getElementById("container").appendChild(createTriangle(canvas.width, canvas.height));
  }
  triangles = document.getElementsByClassName("triangle")
  ctx.translate(canvas.width/2, canvas.height/2);
  frameLooper();
      // ctx.translate(canvas.width/2, canvas.height/2);
}
function frameLooper() {
  window.requestAnimationFrame(frameLooper);
  fbc_array = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(fbc_array);
  ctx.clearRect(-canvas.width/2,-canvas.height/2,canvas.width, canvas.height);
  bars = 200;
  for (var x = 0; x < triangles.length; x++) {
    triangles[x].style.top = triangles[x].getBoundingClientRect().top - 10 * triangles[x].getAttribute("data-speed") + "px";
    if (triangles[x].offsetTop < 50) {
      triangles[x].style.opacity = "0";
      if (window.getComputedStyle(triangles[x]).getPropertyValue("opacity") == 0) {
        triangles[x].parentElement.removeChild(triangles[x]);
        document.getElementById("container").appendChild(createTriangle(canvas.width, canvas.height, true));
      }
    }

    // triangles[x].setAttribute("rotation", (triangles[x].getAttribute("rotation") + 1) % 360);
  }
  for (var i = 0; i < bars; i++) {
    bar_width = 4;
    // bar_width = canvas.width/bars;
    bar_height = -(fbc_array[i])/255 * canvas.height/2 * 0.9;
    var grd = ctx.createLinearGradient(0,0,bar_width, bar_height);
    grd.addColorStop(1, "#4d001f");
    grd.addColorStop(0, "#333");
    ctx.fillStyle = grd;
    ctx.rotate(360/bars*Math.PI/180)
    ctx.fillRect(0, 0, bar_width, bar_height);
  }
}
