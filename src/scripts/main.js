import barba from "@barba/core";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

let scroll;
const select = (el) => document.querySelector(el);
const selectAll = (el) => document.querySelectorAll(el);

// Links
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

// Lenis Scroll
// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// SplitText Func

function initSplittext() {
  SplitText.create(".text-top", {
    type: "chars",
    charsClass: "preloader-chars",
  });
}

// Scroll
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

barba.hooks.leave(() => {
  lenis.scrollTo(0, { immediate: true });
});
// Init Loader

function initLoader() {
  const tl = gsap.timeline();

  tl.set("html", {
    cursor: "wait",
  });
  tl.set(".text-top", {
    clipPath: "inset(0% 100% 0% 0%)",
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

  tl.set("body", {
    autoAlpha: 1,
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
      yPercent: -100,
    },
    ">",
  );
}

function initScripts() {
  initLoader();
  initSplittext();
}

window.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    initScripts();

    console.log("All fonts loaded");
  });
});

// BARBA JS CODE

barba.init({
  // ...
});
