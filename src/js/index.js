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

function handleSlide() {
  var $currentSlide = $($slides[currentSlide]);

  if (isAnimating) {
    event.preventDefault();
    return;
  }

  var direction = -event.deltaY;

  if (direction < 0) {
    // next
    if (currentSlide + 1 >= $slides.length) return;
    if (!bottomIsReached($currentSlide)) return;
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
    handleSlide(event)
  },
  { passive: false }
);

$('iframe').contents().on('scroll', (evt) => {
  console.log("scroll iframe")
  handleSlide(evt)
})
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

