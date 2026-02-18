// Component Loader
async function loadComponent(elementId, filePath) {
  try {
      const response = await fetch(filePath);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      document.getElementById(elementId).innerHTML = html;
      return true;
  } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
      return false;
  }
}

// Initialize header functionality
function initializeHeader() {
  // Toggle mobile menu
  window.toggleMenu = function() {
      const mm = document.getElementById("mobileMenu");
      const toggle = document.querySelector(".mobileToggle");
      if (mm && toggle) {
          mm.classList.toggle("show");
          toggle.classList.toggle("active");
      }
  };

  // Toggle mobile dropdowns
  window.toggleMobileDropdown = function(id) {
      const dropdown = document.getElementById('mobile' + id.charAt(0).toUpperCase() + id.slice(1));
      const header = dropdown?.previousElementSibling;
      if (dropdown) {
          dropdown.classList.toggle('show');
          header?.classList.toggle('active');
      }
  };

  // Close mobile menu when clicking links
  setTimeout(() => {
      document.querySelectorAll('.mobileMenu a').forEach(link => {
          link.addEventListener('click', () => {
              const mm = document.getElementById("mobileMenu");
              const toggle = document.querySelector(".mobileToggle");
              if (mm && toggle) {
                  mm.classList.remove('show');
                  toggle.classList.remove('active');
              }
              
              document.querySelectorAll('.mobile-dropdownMenu.show').forEach(menu => {
                  menu.classList.remove('show');
                  menu.previousElementSibling?.classList.remove('active');
              });
          });
      });
  }, 500);
}

// Load components when page loads
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Loading components...');
  
  // Load header
  const headerLoaded = await loadComponent('header-placeholder', '/components/header.html');
  console.log('Header loaded:', headerLoaded);
  
  // Load footer
  const footerLoaded = await loadComponent('footer-placeholder', '/components/footer.html');
  console.log('Footer loaded:', footerLoaded);
  
  // Initialize header functionality if header loaded successfully
  if (headerLoaded) {
      initializeHeader();
  }
});