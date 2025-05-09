// Lightbox functionality without captions
document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = lightbox.querySelector('.close');

  // Function to open lightbox
  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Function to close lightbox
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Function to initialize lightbox for images
  function initLightbox() {
    // Select all images that should have lightbox
    const images = document.querySelectorAll(`
      main img, 
      .gallery-item img, 
      .charbonnage-gallery img, 
      .image-item img, 
      .testimonial-image img,
      .card img,
      .testimonial-content img
    `);

    images.forEach(img => {
      // Skip if already has lightbox handler
      if (img.dataset.lightboxInitialized) return;
      
      img.style.cursor = 'zoom-in';
      img.dataset.lightboxInitialized = 'true';

      img.addEventListener('click', function(e) {
        e.stopPropagation();
        openLightbox(this.src);
      });
    });
  }

  // Initialize lightbox on page load
  initLightbox();

  // Close button click closes lightbox
  closeBtn.addEventListener('click', closeLightbox);

  // Clicking outside the image closes lightbox
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Pressing ESC key closes lightbox
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });

  // MutationObserver to detect dynamically loaded content
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        initLightbox(); // Reinitialize when new content is added
      }
    });
  });

  // Start observing the document
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
});