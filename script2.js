
// ===== Birthday Site — Clean JS (no music, no game, no countdown) =====
document.addEventListener("DOMContentLoaded", () => {
  // -------- Slideshow (robust: targets the visible slideshow only) --------
  const slideshowContainers = Array.from(document.querySelectorAll(".gallery-slideshow"));
  // pick the container that is actually visible (has layout + not display:none)
  const activeContainer =
    slideshowContainers.find(c => {
      const cs = window.getComputedStyle(c);
      return cs.display !== "none" && c.offsetWidth > 0 && c.offsetHeight > 0;
    }) || slideshowContainers[0] || null;

  if (activeContainer) {
    const slides = Array.from(activeContainer.querySelectorAll(".slide"));
    const indicators = Array.from(activeContainer.querySelectorAll(".indicator"));
    const prevBtn =
      activeContainer.querySelector("#prevSlideBtn") ||
      activeContainer.querySelector(".slide-btn.prev");
    const nextBtn =
      activeContainer.querySelector("#nextSlideBtn") ||
      activeContainer.querySelector(".slide-btn.next");

    let slideIndex = Math.max(0, slides.findIndex(s => s.classList.contains("active")));
    if (slideIndex === -1) slideIndex = 0;

    function showSlide(index) {
      if (!slides.length) return;
      if (index >= slides.length) slideIndex = 0;
      else if (index < 0) slideIndex = slides.length - 1;
      else slideIndex = index;

      slides.forEach((s, i) => {
        s.classList.toggle("active", i === slideIndex);
      });
      indicators.forEach((dot, i) => {
        dot.classList.toggle("active", i === slideIndex);
      });
    }

    function nextSlide() {
      showSlide(slideIndex + 1);
    }
    function prevSlide() {
      showSlide(slideIndex - 1);
    }

    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    indicators.forEach((dot, i) => {
      dot.addEventListener("click", () => showSlide(i));
    });

    // keyboard support (optional)
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    });

    // init
    showSlide(slideIndex);
  }

  // -------- Optional: Grid/Slideshow toggles (safe if not present) --------
  const gridBtn = document.getElementById("gridViewBtn");
  const slideBtn = document.getElementById("slideshowViewBtn");
  const gridView = document.getElementById("galleryGrid");
  const slideView = document.getElementById("gallerySlideshow");

  if (gridBtn && slideBtn && gridView && slideView) {
    gridBtn.addEventListener("click", () => {
      gridView.style.display = "grid";
      slideView.style.display = "none";
    });
    slideBtn.addEventListener("click", () => {
      gridView.style.display = "none";
      slideView.style.display = "block";
    });
  }

  // -------- Navbar: mobile toggle + smooth scroll --------
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  document.querySelectorAll("a.nav-link[href^='#']").forEach(link => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
        navMenu?.classList.remove("open");
      }
    });
  });

  // -------- Simple "Celebrate" button interaction (optional safe) --------
  const celebrateBtn = document.getElementById("celebrateBtn");
  if (celebrateBtn) {
    celebrateBtn.addEventListener("click", () => {
      celebrateBtn.disabled = true;
      setTimeout(() => (celebrateBtn.disabled = false), 1200);
    });
  }
});
