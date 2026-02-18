// components/footer.js
function loadFooter() {
    fetch('/components/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
      })
      .catch(error => console.error('Error loading footer:', error));
  }
  
  document.addEventListener('DOMContentLoaded', loadFooter);