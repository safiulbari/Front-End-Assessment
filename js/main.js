// change title while in mobile
function updateTitle() {
  const title = document.querySelector(".game-selector__modal__header__title");

  window.innerWidth < 768
    ? (title.textContent = "Set Total Ride Hour")
    : (title.textContent = "Select Your Game");
}

updateTitle();

window.addEventListener("resize", updateTitle);

// interactive slider - desktop
const steps = document.querySelectorAll(".slider-desktop__stepper__step");
const fill = document.querySelector(".slider-desktop__stepper__fill");
const recommendedImg = document.querySelector(
  '.slider-desktop__stepper__step[data-step="1"] .slider-desktop__stepper__circle--recommended img'
);
const endTime = document.querySelector(
  ".game-selector__panel__time-preview__duration__end"
);
const endTimeMobile = document.querySelector(
  ".game-selector__panel__duration-setter__content__timeframe-mobile__duration__end"
);
const stadiumBg = document.querySelector(".stadium-bg");
const stadiumIcon = document.querySelector(".stadium-icon");
const tooltip = document.querySelector(
  ".game-selector__panel__time-preview__duration__tooltip"
);
const sliderDesktopTooltip = document.querySelector(".slider-desktop__tooltip");
const hours = document.querySelector(
  ".game-selector__panel__duration-setter__content__hours"
);

const recommandedStarMobile = document.querySelector(".star_icon");

function format12Hour(hour24) {
  const hour = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const ampm = hour24 < 12 || hour24 === 24 ? "AM" : "PM";
  const hourStr = hour.toString().padStart(2, "0");
  return `${hourStr}:00 ${ampm}`;
}

function updateStepper(activeIndex) {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index <= activeIndex);
  });

  const stepWidth = steps[0].offsetWidth;
  const fillWidth = steps[activeIndex].offsetLeft + stepWidth / 2;
  fill.style.width = `${fillWidth}px`;

  // hiding the image while 1st one selected
  if (activeIndex === 0) {
    recommendedImg.style.display = "none";
    sliderDesktopTooltip.style.display = "";
    recommandedStarMobile.style.display = "none";
  } else {
    recommendedImg.style.display = "";
    sliderDesktopTooltip.style.display = "none";
    recommandedStarMobile.style.display = "";
  }

  // in last step need  to fill up the slider fill
  if (activeIndex === 8) {
    fill.style.width = "568px";
  }

  // update hours based on sider movement
  const baseHours = 6;
  const currentHours = baseHours + activeIndex;
  if (hours) {
    hours.textContent = currentHours;
  }

  const baseStartHour = 18;

  // end time update
  const currHours = 6 + activeIndex; // already from your baseHours logic
  const endHour24 = (baseStartHour + currHours) % 24;

  if (endTime) {
    endTime.textContent = format12Hour(endHour24);

    endTimeMobile.textContent = format12Hour(endHour24);
  }

  if (stadiumBg && stadiumIcon) {
    const initialWidth = 291; // px
    const reduceBy = 20 * activeIndex;
    const newWidth = Math.max(initialWidth - reduceBy, 0);
    stadiumBg.style.width = newWidth + "px";
    stadiumBg.style.height = "47px";
    stadiumIcon.style.left = `calc(50% - ${newWidth / 2}px)`;
  }

  if (tooltip) {
    const baseLeft = 152;
    tooltip.style.left = baseLeft + 10 * activeIndex + "px";
  }
}

steps.forEach((s) => s.classList.remove("selected"));
steps[0].classList.add("selected");
updateStepper(0);

steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    steps.forEach((s) => s.classList.remove("selected"));
    step.classList.add("selected");
    updateStepper(index);
  });
});

// Mobile slider
const mobileSteps = document.querySelectorAll(".slider-mobile__stepper__step");

mobileSteps.forEach((step, index) => {
  step.addEventListener("click", () => {
    mobileSteps.forEach((s) => s.classList.remove("selected"));

    step.classList.add("selected");
    updateStepper(index);

    const mobileFill = document.querySelector(".slider-mobile__stepper__fill");
    if (mobileFill) {
      const stepWidth = step.offsetWidth;
      const fillWidth = step.offsetLeft + stepWidth / 2;
      mobileFill.style.width = `${fillWidth}px`;
    }
  });
});
