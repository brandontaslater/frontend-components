var themeToggler = {
  one: function () {
    const themeTogglerMain = document.querySelector(".theme-toggler");

    const themeTogglerMinOpenClose = document.querySelector(
      ".theme-toggler__min__open-close"
    );

    const themeTogglerInfoOpen = document.querySelector(
      ".theme-toggler__min__info__open"
    );

    const themeTogglerMinInfo = document.querySelector(
      ".theme-toggler__min__info"
    );

    const themeTogglerMinClose = document.querySelector(
      ".theme-toggler__min-close"
    );

    const themeTogglerContent = document.querySelector(
      ".theme-toggler__content"
    );

    console.log(themeTogglerMinOpenClose);

    themeTogglerMinOpenClose.addEventListener("click", function (event) {
      const style = getComputedStyle(themeTogglerMinInfo);
      const styleDisplay = style.display;
      if (styleDisplay == "flex") {
        themeTogglerMinInfo.style.display = "none";
        themeTogglerMinOpenClose.style.transform = "rotate(0deg)";
      } else {
        themeTogglerMinInfo.style.display = "flex";
        themeTogglerMinOpenClose.style.transform = "rotate(180deg)";
      }
    });

    themeTogglerInfoOpen.addEventListener("click", function () {
      const style = getComputedStyle(themeTogglerContent);
      const styleDisplay = style.display;

      if (styleDisplay == "none") {
        themeTogglerContent.style.display = "flex";
      } else {
        themeTogglerContent.style.display = "none";
      }
    });

    themeTogglerMinClose.addEventListener("click", function (event) {
      themeTogglerMain.style.display = "none";
    });
  },

  two: function () {
    const cookieName = "bs-theme-toggler-cookie";

    const themeTogglerSelectOptions = document.querySelector(
      "#bs-theme-toggler-two-theme-options"
    );

    themeTogglerSelectOptions.value = getCookie(cookieName);

    const themeTogglerTwo = document.querySelector(".bs-theme-toggler-two");

    const themeTogglerTwoClose = document.querySelector(
      ".bs-theme-toggler-two__close"
    );

    const themeTogglerTwoPopup = document.querySelector(
      ".bs-theme-toggler-two__popup"
    );

    const themeTogglerTwoPopupMessage = document.querySelector(
      ".bs-theme-toggler-two__popup__message"
    );

    const themeTogglerTwoPopupOptions = document.querySelector(
      ".bs-theme-toggler-two__popup__options"
    );

    const themeTogglerTwoCurrentPara = document.querySelector(
      ".bs-theme-toggler-two__popup__options__current"
    );

    const themeTogglerTwoRobot = document.querySelector(
      ".bs-theme-toggler-two__robot"
    );

    const themeTogglerTwoApplyButton = document.querySelector(
      ".bs-theme-toggler-two__popup__options__submit"
    );

    themeTogglerTwoClose.addEventListener("click", function () {
      themeTogglerTwo.style.display = "none";
    });

    var openThemeOptions = function () {
      const style = getComputedStyle(themeTogglerTwoPopupOptions);
      const styleDisplay = style.display;

      if (styleDisplay == "none") {
        themeTogglerTwo.classList.remove("bs-theme-toggler-two--transition");

        themeTogglerTwoCurrentPara.innerHTML = getCookie(cookieName);

        themeTogglerTwoPopupMessage.style.display = "none";
        themeTogglerTwoPopupOptions.style.display = "flex";

        themeTogglerTwoPopup.style.height = "100px";
        themeTogglerTwoPopup.style.top = "-100px";

        themeTogglerTwoClose.style.top = "-114px";
      }
    };

    themeTogglerTwoPopup.addEventListener("click", openThemeOptions);
    themeTogglerTwoRobot.addEventListener("click", openThemeOptions);

    themeTogglerTwoApplyButton.addEventListener("click", function () {
      var themeOptionsDropDown = document.getElementById(
        "bs-theme-toggler-two-theme-options"
      );
      var selectValue = themeOptionsDropDown.value;

      if (selectValue != "") {
        setCookie(cookieName, selectValue, 1);
        var delayInMilliseconds = 1000; //1 second

        setTimeout(function () {
          location.reload();
        }, delayInMilliseconds);
      } else {
        alert("Please Select a Theme!")
      }
    });
  },
};

//themeToggler.one();
themeToggler.two();
