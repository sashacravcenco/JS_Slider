var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,2000);
var playing = true;
var pauseButton = document.getElementById('pause');
var next = document.getElementById('next');
var previous = document.getElementById('prev');

 

function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'slide showing';
}
function nextSlide() {
    goToSlide(currentSlide+1);
}
 
function previousSlide() {
    goToSlide(currentSlide-1);
}
function pauseSlideshow() {
    pauseButton.innerHTML = '&#9658;';
    playing = false;
    clearInterval(slideInterval);
}
 
function playSlideshow() {
    pauseButton.innerHTML = '&#10074;&#10074;';
    playing = true;
    slideInterval = setInterval(nextSlide,2000);
}

next.onclick = function() {
    pauseSlideshow();
    nextSlide();
};
previous.onclick = function() {
    pauseSlideshow();
    previousSlide();
};
 
pauseButton.onclick = function() {
    if(playing) {
    pauseSlideshow();
  } else {
    playSlideshow();
  }
}

nextSlide()

