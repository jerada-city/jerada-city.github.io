// Lightbox functionality with dynamic content support
document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = lightbox.querySelector('.close');

  // Function to open lightbox
  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
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
    // Select all images that should have lightbox (including dynamic ones)
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
        const caption = this.alt || 
                       this.nextElementSibling?.textContent || 
                       this.parentElement.querySelector('figcaption')?.textContent || '';
        openLightbox(this.src, caption);
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

  // Start observing the document with the configured parameters
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
});