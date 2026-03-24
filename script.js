document.documentElement.classList.add("js-ready");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealItems = [...document.querySelectorAll("[data-reveal]")];

if (!reduceMotion && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--delay", `${Math.min(index * 70, 420)}ms`);
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const depthSections = [...document.querySelectorAll("[data-depth]")];

  depthSections.forEach((section) => {
    section.addEventListener("pointermove", (event) => {
      const rect = section.getBoundingClientRect();
      const pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      section.style.setProperty("--pointer-x", pointerX.toFixed(3));
      section.style.setProperty("--pointer-y", pointerY.toFixed(3));
    });

    section.addEventListener("pointerleave", () => {
      section.style.setProperty("--pointer-x", "0");
      section.style.setProperty("--pointer-y", "0");
    });
  });
}
