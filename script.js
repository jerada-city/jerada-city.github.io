// Select necessary elements
const viewport = document.querySelector('.viewport');
const prevButton = document.querySelector('.gallery-nav.prev');
const nextButton = document.querySelector('.gallery-nav.next');

let currentScroll = 0;

// Function to get the current width of one image item
function getImageWidth() {
  return document.querySelector('.image-item').clientWidth;
}

// Helper to update the viewport scroll position
function updateScroll() {
  viewport.scrollLeft = currentScroll;
}

// Event listener for previous button
prevButton.addEventListener('click', () => {
  const imageWidth = getImageWidth();
  currentScroll = Math.max(0, currentScroll - imageWidth);
  updateScroll();
});

// Event listener for next button
nextButton.addEventListener('click', () => {
  const imageWidth = getImageWidth();
  const totalImages = document.querySelectorAll('.image-item').length;
  const maxScroll = (totalImages * imageWidth) - viewport.clientWidth;
  currentScroll = Math.min(maxScroll, currentScroll + imageWidth);
  updateScroll();
});

// Optional: Adjust scroll if the window is resized
window.addEventListener('resize', () => {
  const imageWidth = getImageWidth();
  const totalImages = document.querySelectorAll('.image-item').length;
  const maxScroll = (totalImages * imageWidth) - viewport.clientWidth;
  if (currentScroll > maxScroll) {
    currentScroll = maxScroll;
    updateScroll();
  }
});


//light box functionality
// Lightbox functionality for displaying full-size images with caption
document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = lightbox.querySelector('.close');

  // Function to open lightbox with given image src and caption
  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.style.display = 'block';
    // Prevent scrolling while lightbox is open
    document.body.style.overflow = 'hidden';
  }

  // Function to close lightbox
  function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  // Add click listeners to all images inside main content and galleries
  const images = document.querySelectorAll('main img, .gallery-item img, .charbonnage-gallery img, .image-item img, .testimonial-image img');

  images.forEach(img => {
    img.style.cursor = 'zoom-in'; // Indicate clickability

    img.addEventListener('click', function () {
      // Use the image src to open the lightbox
      // Optionally, show the alt attribute as caption
      openLightbox(img.src, img.alt);
    });
  });

  // Close button click closes lightbox
  closeBtn.addEventListener('click', closeLightbox);

  // Clicking outside the image closes lightbox
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Pressing ESC key closes lightbox
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
      closeLightbox();
    }
  });
});

