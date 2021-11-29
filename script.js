//Selectors
const navToggler = document.querySelector(".nav_toggler");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-modal");
const input = document.querySelector(".input");
const submitBtn = document.querySelector(".submit");
const resultDiv = document.querySelector(".results");
const errorMessage = document.querySelector(".error");

//Function
const openModal = function () {
  modal.style.transform = "translate(0)";
};

const closeModal = function () {
  modal.style.transform = "translate(100%)";
};

const getShortenLinkData = async function (input) {
  try {
    const url = `https://api.shrtco.de/v2/shorten?url=${input}`;

    const res = await fetch(url);

    const data = await res.json();

    const result = Object.entries(data.result);

    const shortLinks = result.filter(
      (el) => el[0].startsWith(`short_link`) && el[1] !== ""
    );

    shortLinks.forEach((link) => {
      const div = document.createElement("div");
      div.classList.add("result");

      const oldlink = document.createElement("p");
      oldlink.classList.add("old-link");
      oldlink.textContent = `${input}`;

      const underDiv = document.createElement("div");
      underDiv.classList.add("new");

      const newLink = document.createElement("p");
      newLink.classList.add("new-link");
      newLink.textContent = `${link[1]}`;

      const copyBtn = document.createElement("button");
      copyBtn.classList.add("copy");
      copyBtn.innerText = "Copy";

      copyBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(link[1]);
        copyBtn.style.backgroundColor = "#3b3054";
        copyBtn.innerText = "Copied!";
        setTimeout(() => {
          copyBtn.style.backgroundColor = "#2acfcf";
          copyBtn.innerText = "Copy";
        }, 2000);
      });

      underDiv.appendChild(newLink);
      underDiv.appendChild(copyBtn);
      div.appendChild(oldlink);
      div.appendChild(underDiv);

      resultDiv.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
};

//Event Listeners
navToggler.addEventListener("click", openModal);

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

submitBtn.addEventListener("click", function () {
  if (input.value === "") {
    input.style.border = "5px solid red";
    errorMessage.style.display = "block";
  } else {
    input.style.border = "";
    errorMessage.style.display = "none";
    resultDiv.innerHTML = "";
    getShortenLinkData(input.value);
  }
});
