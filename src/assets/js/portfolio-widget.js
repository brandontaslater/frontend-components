var portfolioWidget = {
  init: function () {
    portfolioWidget.version2();
    portfolioWidget.version3();
    portfolioWidget.version4();
  },

  version2: function () {
    for (const frontOrBack of document.querySelectorAll(
      ".codeminers-v2-portfolio-widget__flip-card__front"
    )) {
      frontOrBack.addEventListener("click", () => {
        frontOrBack.parentElement.classList.toggle(
          "codeminers-v2-portfolio-widget__flip-card__container--flipped"
        );
      });
    }

    for (const frontOrBack of document.querySelectorAll(
      ".codeminers-v2-portfolio-widget__flip-card__back__close-overlay"
    )) {
      frontOrBack.addEventListener("click", () => {
        frontOrBack.parentElement.parentElement.classList.toggle(
          "codeminers-v2-portfolio-widget__flip-card__container--flipped"
        );
      });
    }
  },

  version3: function () {
    for (const frontOrBack of document.querySelectorAll(
      ".codeminers-v3-portfolio-widget__flip-card__front"
    )) {
      frontOrBack.addEventListener("click", () => {
        frontOrBack.parentElement.classList.toggle(
          "codeminers-v3-portfolio-widget__flip-card__container--flipped"
        );

        setTimeout(function () {
          frontOrBack.parentElement.parentElement.parentElement.classList.toggle(
            "codeminers-v3-portfolio-widget__grid-item--bordered"
          );
        }, 450);
      });
    }

    for (const frontOrBack of document.querySelectorAll(
      ".codeminers-v3-portfolio-widget__flip-card__back__close__button"
    )) {
      frontOrBack.addEventListener("click", () => {
        frontOrBack.parentElement.parentElement.parentElement.parentElement.classList.toggle(
          "codeminers-v3-portfolio-widget__flip-card__container--flipped"
        );

        frontOrBack.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.toggle(
          "codeminers-v3-portfolio-widget__grid-item--bordered"
        );
      });
    }
  },

  version4: function () {
    for (const frontOrBack of document.querySelectorAll(
      ".codeminers-v4-portfolio-widget__flip-card__front"
    )) {
      frontOrBack.addEventListener("click", () => {
        frontOrBack.parentElement.classList.toggle(
          "codeminers-v4-portfolio-widget__flip-card__container--flipped"
        );

        setTimeout(function () {
          frontOrBack.parentElement.parentElement.parentElement.classList.toggle(
            "codeminers-v4-portfolio-widget__grid-item--bordered"
          );
        }, 450);
      });
    }

    for (const frontOrBack of document.querySelectorAll(
      ".codeminers-v4-portfolio-widget__flip-card__back__close__icon"
    )) {
      frontOrBack.addEventListener("click", () => {
        frontOrBack.parentElement.parentElement.parentElement.classList.toggle(
          "codeminers-v4-portfolio-widget__flip-card__container--flipped"
        );

        frontOrBack.parentElement.parentElement.parentElement.parentElement.parentElement.classList.toggle(
          "codeminers-v4-portfolio-widget__grid-item--bordered"
        );
      });
    }
  },
};

portfolioWidget.init();
