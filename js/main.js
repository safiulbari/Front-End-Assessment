// change title while in mobile
function updateTitle() {
  const title = document.querySelector(".game-selector__modal__header__title");

  window.innerWidth < 768
    ? (title.textContent = "Set Total Ride Hour")
    : (title.textContent = "Select Your Game");
}

updateTitle();

window.addEventListener("resize", updateTitle);

// interactive slider
const steps = document.querySelectorAll(".slider-desktop__stepper__step");
const fill = document.querySelector(".slider-desktop__stepper__fill");

function updateStepper(activeIndex) {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index <= activeIndex);
  });

  const stepWidth = steps[0].offsetWidth;
  const gap = steps[1].offsetLeft - steps[0].offsetLeft - stepWidth;
  const fillWidth = steps[activeIndex].offsetLeft + stepWidth / 2;
  fill.style.width = `${fillWidth}px`;
}

steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    updateStepper(index);
  });
});

updateStepper(0); // Start at first step
