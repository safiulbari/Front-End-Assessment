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

const hours = document.querySelector(
  ".game-selector__panel__duration-setter__content__hours"
);

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
  } else {
    recommendedImg.style.display = "";
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
}

// Initialize: set first step selected and update active/fill
steps.forEach((s) => s.classList.remove("selected"));
steps[0].classList.add("selected");
updateStepper(0);

// Add click event listeners to steps
steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    // Remove selected class from all steps
    steps.forEach((s) => s.classList.remove("selected"));

    // Add selected class to clicked step
    step.classList.add("selected");

    // Update active states and fill width
    updateStepper(index);
  });
});
