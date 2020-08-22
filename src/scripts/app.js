import LazyLoad from "vanilla-lazyload";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faGlassCheers,
  faRingsWedding,
} from "@fortawesome/pro-light-svg-icons";
import { faLongArrowAltRight } from "@fortawesome/pro-regular-svg-icons";
import { faCaretDown } from "@fortawesome/pro-solid-svg-icons";
import { faViruses } from "@fortawesome/pro-duotone-svg-icons";

library.add(
  faGlassCheers,
  faRingsWedding,
  faLongArrowAltRight,
  faViruses,
  faCaretDown
);

let sticky = null;
let progress = null;
let bottomOfHero = 0;

window.onload = () => {
  dom.watch();
  new LazyLoad({
    elements_selector: ".lazy",
  });
  smoothScrolling();
  initVariables();
  initToggleButtons();
  initCovid();
  removeHTTP();
  checkSticky();
  progressBar();
};

window.onscroll = () => {
  checkSticky();
  progressBar();
};

function toggleMobile() {
  document.querySelector(".mobile-menu").classList.toggle("active");
}

function smoothScrolling() {
  const hashes = document.querySelectorAll(".smooth");
  Array.from(hashes).forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const hashval = item.getAttribute("href");
      const target = document.querySelector(hashval);

      if (target && hashval) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // eslint-disable-next-line no-restricted-globals
        history.pushState(null, null, hashval);
      }
    });
  });
}

function checkSticky() {
  if (window.scrollY > bottomOfHero - 10) sticky.classList.add("active");
  else sticky.classList.remove("active");
}

function progressBar() {
  const docHeight =
    document.height !== undefined
      ? document.height
      : document.body.offsetHeight;
  const percentage =
    (1 - (docHeight - window.scrollY - window.innerHeight) / docHeight) * 100;
  progress.style.width = `${percentage}%`;
}

function initVariables() {
  const hero = document.querySelector(".hero");
  sticky = document.querySelector("#sticky-header");
  progress = document.querySelector("#progressBar");
  bottomOfHero = hero.offsetTop + hero.offsetHeight;
}

function initToggleButtons() {
  Array.from(document.querySelectorAll(".toggle-mobile")).forEach((el) => {
    el.addEventListener("click", () => {
      toggleMobile();
    });
  });
}

function initCovid() {
  document.querySelector(".rsvp").addEventListener("click", (el) => {
    const desc = document.querySelector(".covid__description");
    document.querySelector(".caret").classList.toggle("active");
    desc.classList.toggle("active");
    if (desc.classList.contains("active"))
      desc.style.maxHeight = `${desc.scrollHeight}px`;
    else desc.style.maxHeight = null;
  });
}

function removeHTTP() {
  document.querySelectorAll('[src*="http:"]').forEach((el) => {
    el.src = el.src.replace("http:", "https:");
  });
}
