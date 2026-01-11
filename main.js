// Restore to previous clean version (no custom particles, no unique cursor, no advanced typing, just basic DOMContentLoaded, dark mode, hamburger, and project modal)

document.addEventListener('DOMContentLoaded', function() {
  // Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  // Project Preview Modal
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      const preview = this.querySelector('.project-preview');
      const projectName = preview.textContent;
      // Create modal for project details
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
      `;
      const modalContent = document.createElement('div');
      modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 600px;
        margin: 1rem;
        cursor: default;
      `;
      modalContent.innerHTML = `
        <h3>${projectName}</h3>
        <p><strong>Status:</strong> ✅ Completed</p>
        <p><strong>GitHub:</strong> <a href="https://github.com/Sathvik257" target="_blank">View Code</a></p>
        <p><strong>Demo:</strong> Available upon request</p>
        <p><strong>Technologies:</strong> ${this.querySelector('.project-tech').innerHTML}</p>
        <button onclick="this.closest('.modal').remove()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
      `;
      modal.appendChild(modalContent);
      modal.classList.add('modal');
      document.body.appendChild(modal);
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.remove();
        }
      });
    });
  });

  // Loading Animation
  setTimeout(() => {
    document.getElementById('loading-overlay').classList.add('hide');
  }, 900);
});
