import barba from "@barba/core";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

let scroll;
const select = (el) => document.querySelector(el);
const selectAll = (el) => document.querySelectorAll(el);

// Links
function initLink() {
  const Links = selectAll(".link");
  Links.forEach((link) => {
    const original = link.querySelector(".original");
    const duplicate = link.querySelector(".duplicate");
    link.addEventListener("mouseenter", () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.inOut" },
      });

      tl.fromTo(
        original,
        {
          rotate: 0,
          yPercent: 0,
        },
        { rotate: -25, yPercent: -100 },
        0,
      );

      tl.fromTo(
        duplicate,
        {
          rotate: -25,
          yPercent: 0,
        },
        {
          rotate: 0,
          yPercent: -100,
        },
        0,
      );
      tl.fromTo(
        link,
        {
          "--translateX": "-100%",
          duration: 0.5,
        },
        { "--translateX": 0 },
        0,
      );
    });

    link.addEventListener("mouseleave", () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.inOut" },
      });

      tl.to(original, { rotate: 0, yPercent: 0 }, 0);

      tl.to(duplicate, { rotate: -25, yPercent: 0 }, 0);
      tl.to(
        link,
        {
          "--translateX": "100%",
          duration: 0.5,
        },
        0,
      );
    });
  });
}

// Lenis Scroll
// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// SplitText Func

function initSplittext() {
  SplitText.create(".split-text", {
    type: "words, lines",
    wordsClass: "single-word",
  });
}

// SCROLL
barba.hooks.leave(() => {
  lenis.scrollTo(0, { immediate: true });
});

barba.hooks.afterEnter(() => {
  initLink();
});

function initLoader() {
  const tl = gsap.timeline();

  tl.set("html", {
    cursor: "wait",
  });
  tl.set(".text-top", {
    clipPath: "inset(0% 100% 0% 0%)",
  });

  tl.set("main", {
    autoAlpha: 1,
  });

  tl.set(".loadingContainer", {
    autoAlpha: 1,
  });

  tl.set(".transitionContainer", {
    autoAlpha: 1,
  });
  tl.set(".loading-screen", {
    rotate: -6,
    scaleX: 1.45,
    scaleY: 1.05,
  });

  tl.set(".transition-screen", {
    rotate: 6,
    scaleX: 1.45,
    scaleY: 1.05,
  });

  tl.to(".loadingContainer .title", {
    "--scaleX": 1,
    delay: 2,
    duration: 2,
    ease: "expo.inOut",
  });

  tl.to(
    ".text-top",
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 2,
      ease: "expo.inOut",
    },
    "<",
  );

  tl.set(
    ".text-bottom",
    {
      opacity: 0,
    },
    ">",
  );

  tl.to(".text-top", {
    yPercent: -100,
    stagger: 0.25,
  });

  tl.set(
    ".loadingContainer .title",
    {
      transformOrigin: "right",
    },
    "<",
  );
  tl.to(
    ".loadingContainer .title",
    {
      "--scaleX": 0,
      opacity: 0,
    },
    ">",
  );

  tl.to(
    "header",
    {
      autoAlpha: 1,
    },
    "<",
  );

  tl.to(
    ".loading-screen",
    {
      yPercent: -100,
      stagger: 0.045,
      rotate: 0.006,
      ease: "expo.inOut",
      scale: 1,
      duration: 0.8,
    },
    "<",
  );

  tl.to(
    ".transition-screen",
    {
      yPercent: -100,
      stagger: 0.045,
      rotate: -0.006,
      ease: "expo.inOut",
      scale: 1,
      duration: 0.8,
    },
    "< 0.5",
  );

  tl.to(
    "html",
    {
      cursor: "auto",
    },
    ">",
  );

  tl.to(
    ".loadingContainer, .transitionContainer",
    {
      yPercent: 100,
    },
    ">",
  );
}

function pageEnter(container) {
  const tl = gsap.timeline();

  tl.set(".transitionContainer", {
    yPercent: 0,
  }).to(".transition-screen", {
    yPercent: 0,
  });

  return tl;
}

function initScripts() {
  initLoader();
  initSplittext();
}

// BARBA JS CODE
barba.init({
  debug: true,
  sync: true,
  transitions: [
    {
      name: "default",
      once() {
        initScripts();
      },
      leave({ current }) {
        pageEnter(current.container);
      },
      enter() {},
      beforeEnter() {},
    },
    {
      name: "self",
      leave() {},
      enter() {},
      beforeEnter() {},
    },
  ],
});

window.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    initScripts();
  });
});
