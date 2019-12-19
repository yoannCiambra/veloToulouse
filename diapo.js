let slides = document.querySelectorAll('.slide');
var slide1 = slides[0];
var slide2 = slides[1];
var slide3 = slides[2];

var butt_right = document.querySelector('.fa-chevron-right');
var butt_left = document.querySelector('.fa-chevron-left');
var butt_pause = document.querySelector('.fa-pause');
var butt_play = document.querySelector('.fa-play')

var index = 0;

// Slide suivante
function next_slide() {
    
  slides[index].classList.remove('slide-active'); //on passe la classe de slide en slide pour le défilement
  if (index === 2) {
    index = -1;
  }
    
  slides[index+1].classList.add('slide-active');
  index = index +1;
  console.log('slide : ' + index);
    
}

// Slide précédente
function previous_slide() {
  slides[index].classList.remove('slide-active'); // 0 - 2 - 1
  if (index == 0) {
    index = 3;
  }
  slides[index-1].classList.add('slide-active');  // 2 - 1 - 0
  index = index -1;
  console.log('slide : ' + index);
}

// Butt right
butt_right.addEventListener('click', function (){
  next_slide();
});

// Butt left
butt_left.addEventListener('click', function (){
  previous_slide();
});

// Auto Play
var idInterval;
start_autoplay();

function start_autoplay() {
  idInterval = window.setInterval(function () {
    next_slide();
  }, 5000);
}

butt_pause.addEventListener('click', function (){
    console.log(butt_pause);
    document.getElementById('pause-slider').style.zIndex=0
    document.getElementById('play-slider').style.zIndex=1
});
    
 butt_play.addEventListener('click', function (){
    console.log(butt_play);
    document.getElementById('pause-slider').style.zIndex=1
    document.getElementById('play-slider').style.zIndex=0
});

    
butt_pause.addEventListener('click', function (){
  if (butt_pause.classList.contains('pausing')) { // en pause -> relance timer
    start_autoplay();
      console.log('play');
    butt_pause.classList.remove('pausing');
  } else { // pas en pause -> met en pause
    console.log('pause');
    window.clearInterval(idInterval);
    butt_pause.classList.add('pausing');
  }
});