var sliderWithinSlider = {
  init: function () {
    sliderWithinSlider.slider();
  },

  slider: function () {
    const swsMain = tns({
      container: ".sws-section__main-slider__slides",
      items: 1,
      nav: false,
      controls: false,
      slideBy: "page",
      autoplay: true,
      autoplayButtonOutput: false,
      speed: 1000,
      axis: "horizontal",
      loop: true,
      rewind: false,
      mouseDrag: false,
    });

    const swsController = tns({
      container: ".sws-section__controls__preview-slider__slides",
      controlsContainer: ".sws-section__controls__directional__container",
      items: 3,
      nav: false,
      controls: false,
      slideBy: 1,
      autoplay: true,
      autoplayButtonOutput: false,
      speed: 1000,
      axis: "horizontal",
      loop: true,
      rewind: false,
      mouseDrag: true,
      gutter: 10,
    });

    // Added an event listener to navigate to the previous image (Main & Preview Sliders)
    document
      .querySelector(".sws-section__controls__directional__prev")
      .addEventListener("click", function (event) {
        swsMain.goTo("prev");
        swsController.goTo("prev");
      });

    // Added an event listener to navigate to the next image (Main & Preview Sliders)
    document
      .querySelector(".sws-section__controls__directional__next")
      .addEventListener("click", function (event) {
        swsMain.goTo("next");
        swsController.goTo("next");
      });

    //Added event listeners to all preview images to navigate through main slider
    const previewSlides = document.querySelectorAll(
      ".sws-section__controls__preview-slider__slides"
    );

    for (
      let previewSlidesIndex = 0;
      previewSlidesIndex < previewSlides.length;
      previewSlidesIndex++
    ) {
      const previewSlide = previewSlides[previewSlidesIndex];
      previewSlide.addEventListener("click", function (event) {
        previewSlideId = event.target.getAttribute("data-slide-id");
        swsMain.goTo(previewSlideId);
        swsController.goTo(previewSlideId);
      });
    }

    // Enables autoscroll for main slider (doesnt work in conjunction with preview click change)
    swsController.events.on("transitionStart", function (info, eventName) {
      //swsMain.goTo("next");
    });
  },
};

sliderWithinSlider.init();
