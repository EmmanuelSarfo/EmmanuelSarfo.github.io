//Dark Mode With Local Storage//
// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem("darkMode");

const darkModeToggle = document.querySelector("#dark-mode-toggle");

const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add("darkmode");
  // 2. Update darkMode in localStorage
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove("darkmode");
  // 2. Update darkMode in localStorage
  localStorage.setItem("darkMode", null);
};

// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === "enabled") {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener("click", () => {
  // get their darkMode setting
  darkMode = localStorage.getItem("darkMode");

  // if it not current enabled, enable it
  if (darkMode !== "enabled") {
    enableDarkMode();
    // if it has been enabled, turn it off
  } else {
    disableDarkMode();
  }
});

//Vertical Navigation Bar//
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("nav ul li a");

function setActiveNavLink(id) {
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  document.querySelector(`nav ul li a[href*=${id}]`).classList.add("active");
}

window.onscroll = () => {
  let top = window.scrollY + window.innerHeight / 2;

  sections.forEach((sec) => {
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    // Check if the scroll position is within the current section
    if (top >= offset && top <= offset + height) {
      setActiveNavLink(id);
    }
  });

  // Check if at the bottom of the page
  let isAtBottom = top >= document.body.offsetHeight - window.innerHeight / 2;
  if (isAtBottom) {
    setActiveNavLink(sections[sections.length - 1].getAttribute("id"));
  }
};

//Contact Form To Google Sheets//
const scriptURL =
  "https://script.google.com/macros/s/AKfycbyPT4UABcI3tGGLroXaC6ng1Css5-EA8sPexWzueaxk52VFstLorYHT8Tr6ukKhnP_g/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Thank you for your message!";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
