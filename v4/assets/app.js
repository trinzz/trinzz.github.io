function toggleMenu() {
  const mm = document.getElementById("mobileMenu");
  const toggle = document.querySelector(".mobileToggle");

  if (mm) {
    mm.classList.toggle("show");
    toggle.classList.toggle("active");
  }
}

function toggleMobileDropdown(id) {
  const dropdown = document.getElementById(
    "mobile" + id.charAt(0).toUpperCase() + id.slice(1)
  );
  const header = dropdown.previousElementSibling;

  if (dropdown) {
    dropdown.classList.toggle("show");
    header.classList.toggle("active");
  }
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    const mm = document.getElementById("mobileMenu");
    const toggle = document.querySelector(".mobileToggle");
    mm.classList.remove("show");
    toggle.classList.remove("active");

    // Also close any open dropdowns
    document.querySelectorAll(".mobile-dropdownMenu.show").forEach((menu) => {
      menu.classList.remove("show");
      menu.previousElementSibling.classList.remove("active");
    });
  });
});



window.addEventListener("load", () => {
  const script = document.createElement("script");
  script.src = "https://widgets.leadconnectorhq.com/loader.js";
  script.dataset.resourcesUrl = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
  script.dataset.widgetId = "69920ddea0e96a26dc435438";
  script.async = true;
  document.body.appendChild(script);
});






const announcements = [
  { text: "Ms Trina Das is speaking at the PMWC 2026 (Mar 4-6, Santa Clara)", link: "https://pmwcintl.com/speaker/trina-das-494_trinzz_2026sv" },
  { text: "We are exhibiting & presenting Trinzz at VIVE 2026 (Feb 22-25, Los Angeles)", link: "https://vive2026.mapyourshow.com/8_0/exhibitor/exhibitor-details.cfm?exhid=ViVE2026_1069" },
  { text: "🌟Trinzz is now SOC2 Type II Certified 🌟" },
  { text: "Ms Trina Das is speaking at the PMWC 2026 (Mar 4-6, Santa Clara)", link: "https://pmwcintl.com/speaker/trina-das-494_trinzz_2026sv" },
  { text: "We are exhibiting & presenting Trinzz at VIVE 2026 (Feb 22-25, Los Angeles)", link: "https://vive2026.mapyourshow.com/8_0/exhibitor/exhibitor-details.cfm?exhid=ViVE2026_1069" },
  { text: "🌟Trinzz is now SOC2 Type II Certified 🌟" },
];

const fadeMarquee = document.getElementById("fadeMarquee");
let current = 0;

// create span elements
announcements.forEach((ann, index) => {
  const span = document.createElement("span");
  span.classList.add("fade-announcement");
  span.style.opacity = index === 0 ? 1 : 0; // show first, hide rest
  if (ann.link) {
    span.innerHTML = `<a href="${ann.link}" target="_blank">${ann.text} <i class="ri-arrow-right-line"></i></a>`;
  } else {
    span.textContent = ann.text;
  }
  fadeMarquee.appendChild(span);
});

const items = document.querySelectorAll(".fade-announcement");

setInterval(() => {
  items[current].style.opacity = 0;
  current = (current + 1) % items.length;
  items[current].style.opacity = 1;
}, 4000);


