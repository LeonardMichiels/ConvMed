var currentSlide = 0;
var selector = "section";
var $slides = $(selector);
var isAnimating = false;

// ==================================smooth-scroll-start==================================

var stopAnimation = function () {
  console.log(currentSlide)
  setTimeout(function () {
    isAnimating = false;
  }, 300);
};

var bottomIsReached = function ($elem) {
  var rect = $elem[0].getBoundingClientRect();
  return rect.bottom <= $(window).height();
};

var topIsReached = function ($elem) {
  var rect = $elem[0].getBoundingClientRect();
  return rect.top >= 0;
};

function handleSlide(event) {
  var $currentSlide = $($slides[currentSlide]);

  if (isAnimating) {
    event.preventDefault();
    return;
  }

  var direction = -event.deltaY;

  if (direction < 0) {
    // next
    if (currentSlide + 1 >= $slides.length) {
      return; 
    }/* 
    if (!bottomIsReached($currentSlide)) {
      return; 
    } */
    event.preventDefault();
    currentSlide++;
    var $slide = $($slides[currentSlide]);
    var offsetTop = $slide.offset().top;
    isAnimating = true;
    $("html, body").animate(
      {
        scrollTop: offsetTop
      },
      1000,
      stopAnimation
    );
  } else {
    // back
    if (currentSlide - 1 < 0) return;
    if (!topIsReached($currentSlide)) return;
    event.preventDefault();
    currentSlide--;
    var $slide = $($slides[currentSlide]);
    var offsetTop = $slide.offset().top;
    isAnimating = true;
    $("html, body").animate(
      {
        scrollTop: offsetTop
      },
      1000,
      stopAnimation
    );
  }
}

document.addEventListener("wheel", function (event) {
    console.log("scroll")
    handleSlide(event)
  },
  { passive: false }
);

/* $('iframe').contents().on('scroll', (evt) => {
  console.log("scroll iframe")
  handleSlide(evt)
}) */

/* $("#boredIframe").on('load', function () {
  let iframe = $("#boredIframe").contents();

 $(iframe).on('scroll', function (evt) { 
   console.log("scroll iframe")
    handleSlide(evt)
 });
}); */

var myIframe = document.getElementById('boredIframe');
myIframe.onload = function () {
    console.log("scroll iframe")
    myIframe.contentWindow.handleSlide(evt);
}

// ==================================smooth-scroll-end==================================


//nav-start
// Get the container element
var btnContainer = document.getElementById("navbar");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("btn");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}


$(".btn").on("click", function (evt) {
  currentSlide = $(evt.currentTarget).data("slide-n")
  $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 400);
});
//rain
var makeItRain = function() {
  //clear out everything
  $('.rain').empty();

  var increment = 0;
  var drops = "";
  var backDrops = "";

  while (increment < 100) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
    //random number between 5 and 2
    var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
    //increment
    increment += randoFiver;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
  }

  $('.rain.front-row').append(drops);
  $('.rain.back-row').append(backDrops);
}

$('.splat-toggle.toggle').on('click', function() {
  $('body').toggleClass('splat-toggle');
  $('.splat-toggle.toggle').toggleClass('active');
  makeItRain();
});

$('.back-row-toggle.toggle').on('click', function() {
  $('body').toggleClass('back-row-toggle');
  $('.back-row-toggle.toggle').toggleClass('active');
  makeItRain();
});

$('.single-toggle.toggle').on('click', function() {
  $('body').toggleClass('single-toggle');
  $('.single-toggle.toggle').toggleClass('active');
  makeItRain();
});

makeItRain();