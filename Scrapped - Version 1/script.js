window.onload = function initalizeStars() {
    width = screen.width;
    height = screen.height;
    var NUM_STARS = 50;
    var ANIMATION_DELAY = 0.1;
    var anim = ANIMATION_DELAY;
    for (var x = 0; x < NUM_STARS; x++) {
      var star = document.createElement('div');
      star.className = "star";
      star.className += " pulse";
      var left = Math.floor(Math.random() * width);
      var top = Math.floor(Math.random() * (height-100));
      star.setAttribute('style', 'left: ' + left + 'px; top: ' + top + "px; animation-delay:" + anim + "s;" );
      anim += ANIMATION_DELAY;
      document.getElementsByClassName('home')[0].append(star);
    }
    var stars = document.getElementsByClassName("star");
    var stars_length = stars.length;

}
