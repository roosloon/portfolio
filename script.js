const header = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".nav-links a");

const sections = ["profile", "experience", "projects", "creative"];

function setActiveLink(sectionId) {
  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${sectionId}`) {
      link.classList.add("active");
    }
  });
}

function updateHeader(sectionId) {
  header.classList.remove("experience-active", "projects-active", "creative-active");

  if (sectionId === "experience") {
    header.classList.add("experience-active");
  }

  if (sectionId === "projects") {
    header.classList.add("projects-active");
  }

  if (sectionId === "creative") {
    header.classList.add("creative-active");
  }
}

function scrollToSection(sectionId) {
  if (sectionId === "profile") {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    setActiveLink(sectionId);
    return;
  }

  const section = document.getElementById(sectionId);

  if (!section) return;

  window.scrollTo({
    top: section.offsetTop,
    behavior: "smooth"
  });

  setActiveLink(sectionId);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) return;

    event.preventDefault();

    const sectionId = href.replace("#", "");

    scrollToSection(sectionId);
  });
});

window.addEventListener("scroll", () => {
  let currentSection = "profile";

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);

    if (!section) return;

    if (window.scrollY >= section.offsetTop - 83) {
      currentSection = sectionId;
    }
  });

  setActiveLink(currentSection);
  updateHeader(currentSection);
});

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

const experienceItems = document.querySelectorAll(".experience-item");

const experienceObserver = new IntersectionObserver(
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
    threshold: 0.35
  }
);

experienceItems.forEach((item) => {
  experienceObserver.observe(item);
});

const scrollTopButton = document.querySelector(".scroll-top-button");

if (scrollTopButton) {
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}