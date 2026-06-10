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
