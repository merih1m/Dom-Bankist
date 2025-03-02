const myCarouselElement = document.querySelector("#myCarousel");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const header = document.querySelector(".header");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

//!////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
//!////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const message = document.createElement("div");
message.classList.add("cookie-message");

message.innerHTML = `We use cookies for improved functionality and analytics.<button class="btn btn-close-cookie">Got it </button>`;
// header.prepend(message)
header.append(message);
//* header.append(message.cloneNode(true)) clone child element
// header.before(message)
// header.after(message)
document
  .querySelector(".btn-close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });
message.style.background = "#37383d";
message.style.width = "120%";
//!////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

btnScrollTo.addEventListener("click", function () {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  section1.scrollIntoView({ block: "center", behavior: "smooth" });
});
//!////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Page navigation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document
      .querySelector(id)
      .scrollIntoView({ block: "center", behavior: "smooth" });
  }
});
//!////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return; //moder way to check if button was clicked (look nicely and don't need brackets)

  tabs.forEach((e) => e.classList.remove("operations__tab--active"));
  tabsContent.forEach((e) => e.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//!////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//*Menu fade animation

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//* Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
//!////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Sticky nav
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //кількість пікселів від лінії (що розділяє розділи) до появи хедера|| кількіль пікселів від верхньої точки view port
  rootMargin: `-${navHeight}px`, //піднятя хедера над лінію появи (navHeight динамічна висота хедера )
});
headerObserver.observe(header);
//!////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const allSection = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  console.log(observer.observe);
  observer.unobserve(entry.target);
};
const sectionobserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (section) {
  sectionobserver.observe(section);
  section.classList.add("section--hidden");
});
//!////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Lazy loading img
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src wth data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgTargets.forEach((img) => imgObserver.observe(img));
//!////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Alert with use "mouseenter"
// const h1 = document.querySelector("h1");

// const alertH1 = function (e) {
//   alert("addEventListener:h1");
//   h1.removeEventListener("mouseenter", alertH1); //delete event listener for prevention another alert.
// };
//
// h1.addEventListener("mouseenter", alertH1);
//* Dom manipulation (work with tree)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
//
// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Link", e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
//   //! Stop propagation
//   e.stopPropagation();
// });
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Container", e.target, e.currentTarget);
// });
// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Nav", e.target, e.currentTarget);
// });
