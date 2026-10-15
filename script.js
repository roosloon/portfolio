const sectionCandidates = ["profile", "experience", "projects", "creative", "contact"];
const sections = sectionCandidates.filter((id) => document.getElementById(id));
const sideNav = document.querySelector(".side-nav");
const sideNavLinks = document.querySelectorAll(".side-nav-links li");
const stickyAboutLinks = document.querySelectorAll(".sticky-about .nav-about-link");

function updateSideNav(sectionId) {
  if (!sideNav) return;

  sideNavLinks.forEach((li) => li.classList.remove("active"));
  sideNav.classList.remove("on-intro", "on-profile", "on-experience", "on-projects", "on-creative", "on-contact");

  if (!sectionId) {
    sideNav.classList.add("on-intro");
    return;
  }

  if (sectionId === "profile" || sectionId === "experience") sideNav.classList.add("on-profile");
  if (sectionId === "projects") sideNav.classList.add("on-projects");
  if (sectionId === "creative") sideNav.classList.add("on-creative");
  if (sectionId === "contact") sideNav.classList.add("on-contact");

  const activeLink = document.querySelector(`.side-nav-links li a[href="#${sectionId}"]`);
  if (activeLink) activeLink.closest("li").classList.add("active");
}

function updateStickyColors(sectionId) {
  const classes = ["section-intro", "section-profile", "section-experience", "section-projects", "section-creative", "section-contact"];
  stickyAboutLinks.forEach((link) => link.classList.remove(...classes));

  if (!sectionId) {
    stickyAboutLinks.forEach((link) => link.classList.add("section-intro"));
  } else if (sectionId === "profile" || sectionId === "experience") {
    stickyAboutLinks.forEach((link) => link.classList.add("section-profile"));
  } else if (sectionId === "projects") {
    stickyAboutLinks.forEach((link) => link.classList.add("section-projects"));
  } else if (sectionId === "creative") {
    stickyAboutLinks.forEach((link) => link.classList.add("section-creative"));
  } else if (sectionId === "contact") {
    stickyAboutLinks.forEach((link) => link.classList.add("section-contact"));
  }
}

sideNavLinks.forEach((li) => {
  const link = li.querySelector("a");
  if (!link) return;

  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    event.preventDefault();

    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);
    if (!section) return;

    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth"
    });
  });
});

window.addEventListener("scroll", () => {
  let sideNavSection = null;
  let btnSection = null;

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    if (window.scrollY >= section.offsetTop - 380) {
      sideNavSection = sectionId;
    }
    if (window.scrollY >= section.offsetTop - 83) {
      btnSection = sectionId;
    }
  });

  if (!btnSection && !document.querySelector(".intro-section")) {
    const fallback = document.getElementById("projects") ? "projects" : "contact";
    btnSection = fallback;
    sideNavSection = fallback;
  }
  updateSideNav(sideNavSection);
  updateStickyColors(btnSection);
});

// Initial state based on scroll position
(function initColors() {
  let sideNavSection = null;
  let btnSection = null;
  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    if (window.scrollY >= section.offsetTop - 380) sideNavSection = sectionId;
    if (window.scrollY >= section.offsetTop - 83) btnSection = sectionId;
  });
  if (!btnSection && !document.querySelector(".intro-section")) {
    const fallback = document.getElementById("projects") ? "projects" : "contact";
    btnSection = fallback;
    sideNavSection = fallback;
  }
  updateSideNav(sideNavSection);
  updateStickyColors(btnSection);
})();

/* =========================
   Intro Fade / Blur
========================= */

const introContent = document.querySelector(".intro-content");
const introSection = document.querySelector(".intro-section");

window.addEventListener("scroll", () => {
  if (!introContent || !introSection) return;

  const introHeight = introSection.offsetHeight;
  const scrollProgress = Math.min(window.scrollY / introHeight, 1);

  const opacity = 1 - scrollProgress;
  const blur = scrollProgress * 12;
  const translateY = scrollProgress * -40;

  introContent.style.opacity = opacity;
  introContent.style.filter = `blur(${blur}px)`;
  introContent.style.transform = `translateY(${translateY}px)`;
});

/* =========================
   Project Card Visibility
========================= */

const projectCards = document.querySelectorAll(".case-card");

const projectCardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    threshold: 0.6
  }
);

projectCards.forEach((card) => {
  projectCardObserver.observe(card);
});

/* =========================
   Painting Carousel
========================= */

const paintingTrack = document.querySelector(".painting-track");
const paintingCards = document.querySelectorAll(".painting-card");
const paintingPrevButton = document.querySelector(".painting-arrow-left");
const paintingNextButton = document.querySelector(".painting-arrow-right");

let activePaintingIndex = 3;

function updatePaintingCarousel() {
  if (!paintingTrack || paintingCards.length === 0) return;

  paintingCards.forEach((card) => {
    card.classList.remove("is-active");
  });

  paintingCards[activePaintingIndex].classList.add("is-active");

  const activeCard = paintingCards[activePaintingIndex];
  const viewport = document.querySelector(".painting-viewport");

  if (!viewport) return;

  const viewportCenter = viewport.offsetWidth / 2;
  const activeCardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;

  paintingTrack.style.transform = `translateX(${viewportCenter - activeCardCenter}px)`;
}

if (paintingPrevButton && paintingNextButton && paintingCards.length > 0) {
  paintingPrevButton.addEventListener("click", () => {
    activePaintingIndex--;

    if (activePaintingIndex < 0) {
      activePaintingIndex = paintingCards.length - 1;
    }

    updatePaintingCarousel();
  });

  paintingNextButton.addEventListener("click", () => {
    activePaintingIndex++;

    if (activePaintingIndex >= paintingCards.length) {
      activePaintingIndex = 0;
    }

    updatePaintingCarousel();
  });

  window.addEventListener("resize", updatePaintingCarousel);
  window.addEventListener("load", updatePaintingCarousel);

  updatePaintingCarousel();
}

/* =========================
   Contact Fade In
========================= */

const contactContent = document.querySelector(".contact-content");

if (contactContent) {
  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          contactContent.classList.add("is-visible");
        } else {
          contactContent.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.35
    }
  );

  contactObserver.observe(contactContent);
}

/* =========================
   Experience Fade In Once
========================= */

const experienceItems = document.querySelectorAll(".experience-item");

const experienceObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.35
  }
);

experienceItems.forEach((item) => {
  experienceObserver.observe(item);
});

/* =========================
   Project Detail Fade In Once
   Reveal per section
========================= */

const projectRevealItems = document.querySelectorAll(`
  .project-page .project-detail-section:not(.project-title-hero) > .project-detail-layout
`);

const projectRevealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.05,
    rootMargin: "0px 0px 180px 0px"
  }
);

projectRevealItems.forEach((item) => {
  item.classList.add("project-reveal-item");
  projectRevealObserver.observe(item);
});

/* =========================
   Project Title Fade / Blur
========================= */

const projectTitleContent = document.querySelector(".project-title-hero .project-title-content");
const projectTitleBg = document.querySelector(".project-title-hero .project-title-background");
const projectTitleSection = document.querySelector(".project-title-hero");

window.addEventListener("scroll", () => {
  if (!projectTitleContent || !projectTitleSection) return;

  const sectionHeight = projectTitleSection.offsetHeight;
  const scrollProgress = Math.min(window.scrollY / sectionHeight, 1);

  projectTitleContent.style.opacity = 1 - scrollProgress;
  projectTitleContent.style.filter = `blur(${scrollProgress * 12}px)`;
  projectTitleContent.style.transform = `translateY(${scrollProgress * -40}px)`;

  if (projectTitleBg) {
    projectTitleBg.style.opacity = 1 - scrollProgress;
    projectTitleBg.style.filter = `blur(${scrollProgress * 12}px)`;
    projectTitleBg.style.transform = `translateY(${scrollProgress * -40}px)`;
  }
});

/* =========================
   Side Nav Active Section
========================= */

const projectSections = ["challenge", "methods", "approach", "outcome", "process", "relevance", "more-information"];

function updateProjectNav() {
  let currentSection = null;

  projectSections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    if (window.scrollY >= section.offsetTop - 350) {
      currentSection = sectionId;
    }
  });

  document.querySelectorAll(".project-side-nav .side-nav-links li").forEach((li) => {
    li.classList.remove("active");
  });

  if (currentSection) {
    const activeLink = document.querySelector(`.project-side-nav .side-nav-links li a[href="#${currentSection}"]`);
    if (activeLink) activeLink.closest("li").classList.add("active");
  }

  const projectNav = document.querySelector(".project-side-nav");
  const projectSticky = document.querySelector(".project-sticky-left");
  const projectStickyAbout = document.querySelector(".sticky-about");
  if (projectNav) {
    const isLight = !currentSection || currentSection === "challenge";
    projectNav.classList.toggle("on-intro", isLight);
    if (projectSticky) projectSticky.classList.toggle("on-intro", isLight);
    if (projectStickyAbout) projectStickyAbout.classList.toggle("on-intro", isLight);
  }
}

window.addEventListener("scroll", updateProjectNav);
updateProjectNav();
