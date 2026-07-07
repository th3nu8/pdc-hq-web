document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-fallback]").forEach((img) => {
    if (!(img instanceof HTMLImageElement)) return;

    const showFallback = () => {
      const fallback = img.dataset.fallback;
      if (!fallback) return;
      img.replaceWith(createLogoFallback(fallback, img.className));
    };

    if (img.complete && img.naturalWidth === 0) showFallback();
    else img.addEventListener("error", showFallback, { once: true });
  });

  document.querySelectorAll(".division-banner-wrap").forEach((wrap) => {
    const img = wrap.querySelector(".division-banner-img");
    const placeholder = wrap.querySelector(".division-banner-placeholder");
    if (!(img instanceof HTMLImageElement) || !(placeholder instanceof HTMLElement)) return;

    const showPlaceholder = () => {
      img.hidden = true;
      placeholder.hidden = false;
    };

    const showImage = () => {
      img.hidden = false;
      placeholder.hidden = true;
    };

    if (img.complete && img.naturalWidth > 0) {
      showImage();
    } else if (img.complete) {
      showPlaceholder();
    } else {
      showPlaceholder();
      img.addEventListener("load", showImage, { once: true });
      img.addEventListener("error", showPlaceholder, { once: true });
    }
  });
});

function createLogoFallback(label, className) {
  const el = document.createElement("div");
  if (className.includes("division-detail-logo")) {
    el.className = "division-detail-logo-fallback";
  } else if (className.includes("division-card-logo")) {
    el.className = "division-card-logo-fallback";
  } else {
    el.className = "division-logo-fallback";
  }
  el.textContent = label;
  el.setAttribute("aria-hidden", "true");
  return el;
}
