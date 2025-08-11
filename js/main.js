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
  const fillWidth = steps[activeIndex].offsetLeft + stepWidth / 2;
  fill.style.width = `${fillWidth}px`;
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
