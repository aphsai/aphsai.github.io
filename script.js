var audio = new Audio();
audio.src = 'cocoa.mp3';
audio.loop = true;
audio.autoplay = true;

var canvas, ctx, source, context, analyzer, fbc_array, bars, bar_x, bar_width, bar_height;

window.onload = function init() {
  document.getElementById('container').appendChild(audio);
  context = new AudioContext();
  analyzer = context.createAnalyser();
  canvas = document.getElementById('analyzer');
  ctx = canvas.getContext('2d');

  source = context.createMediaElementSource(audio);
  source.connect(analyzer);
  analyzer.connect(context.destination);
  frameLooper();
}
function frameLooper() {
  window.requestAnimationFrame(frameLooper);
  fbc_array = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(fbc_array);
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = '#00CCFF';
  bars = 100;
  for (var i = 0; i < bars; i++) {
    bar_x = i * 3;
    bar_width = 2;
    bar_height = -(fbc_array[i] / 2);
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
}
