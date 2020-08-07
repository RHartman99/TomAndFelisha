import LazyLoad from "vanilla-lazyload";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faGlassCheers,
  faRingsWedding,
} from "@fortawesome/pro-light-svg-icons";

library.add(faGlassCheers, faRingsWedding);

window.onload = () => {
  dom.watch();
  new LazyLoad({
    elements_selector: ".lazy",
  });

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
};
