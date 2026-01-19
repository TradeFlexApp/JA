const reduceMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
const prefersReducedMotion = () => Boolean(reduceMotionQuery?.matches);

function setActiveNav(sectionId) {
  const links = document.querySelectorAll(".nav__link");
  for (const link of links) {
    const isActive = link.getAttribute("data-nav") === sectionId;
    link.classList.toggle("is-active", isActive);
    link.setAttribute("aria-current", isActive ? "page" : "false");
  }
}

function wireNavSmoothScroll() {
  const links = document.querySelectorAll(".nav__link");
  for (const link of links) {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href?.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      // Let the hash update, but take over scrolling for consistent offset behavior.
      event.preventDefault();
      history.pushState(null, "", href);

      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    });
  }
}

function observeSectionsForActiveNav() {
  const sections = document.querySelectorAll(".week");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      // Pick the most visible section.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

      if (visible.length > 0) {
        setActiveNav(visible[0].target.id);
      }
    },
    {
      root: null,
      threshold: [0.2, 0.35, 0.5, 0.65],
      rootMargin: "-40% 0px -55% 0px",
    }
  );

  for (const section of sections) observer.observe(section);

  // Initialize active state.
  const hashId = window.location.hash?.slice(1);
  if (hashId) setActiveNav(hashId);
  else setActiveNav("week-1");
}

function observeRevealAnimations() {
  const targets = document.querySelectorAll('[data-animate="reveal"]');
  if (!targets.length) return;

  // If reduced motion is requested, just show everything.
  if (prefersReducedMotion()) {
    for (const el of targets) el.classList.add("in-view");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  for (const el of targets) observer.observe(el);
}

wireNavSmoothScroll();
observeSectionsForActiveNav();
observeRevealAnimations();
