var audio = new Audio();
audio.loop = true;
audio.autoplay = true;
audio.setAttribute("style","display:none;");
var canvas, ctx, source, context, analyzer, fbc_array, bars, bar_x, bar_width, bar_height;

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
  // canvas.setAttribute("style","height:" + document.body.getBoundingClientRect().height + "px; width:" + document.body.getBoundingClientRect().width + "px;");
  ctx = canvas.getContext('2d');

  source = context.createMediaElementSource(audio);
  source.connect(analyzer);
  analyzer.connect(context.destination);
  ctx.translate(canvas.width/2, canvas.height/2);
  frameLooper();
      // ctx.translate(canvas.width/2, canvas.height/2);
}
function frameLooper() {
  window.requestAnimationFrame(frameLooper);
  fbc_array = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(fbc_array);
  ctx.clearRect(-canvas.width/2,-canvas.height/2,canvas.width, canvas.height);
  bars = 100;
  for (var i = 0; i < bars; i++) {
    bar_width = 8;
    // bar_width = canvas.width/bars;
    bar_height = -(fbc_array[i])/255 * canvas.height/2 * 0.9;
    var grd = ctx.createLinearGradient(0,0,bar_width, bar_height);
    grd.addColorStop(1, "#4d001f");
    grd.addColorStop(0, "#333");
    ctx.fillStyle = grd;
    ctx.rotate(3.6*Math.PI/180)
    ctx.fillRect(0, 0, bar_width, bar_height);
  }
}
