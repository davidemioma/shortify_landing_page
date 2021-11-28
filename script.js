//Selectors
const navToggler = document.querySelector(".nav_toggler");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-modal");

//Function
const openModal = function () {
  modal.style.transform = "translate(0)";
};

const closeModal = function () {
  modal.style.transform = "translate(100%)";
};

//Event Listeners
navToggler.addEventListener("click", openModal);

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
