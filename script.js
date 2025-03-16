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



// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close');

// Open lightbox when an image is clicked
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;

    // Check if a caption exists
    const caption = img.nextElementSibling;
    if (caption && caption.classList.contains('caption')) {
      lightboxCaption.textContent = caption.textContent; // Display caption
      lightboxCaption.style.display = 'block';
    } else {
      lightboxCaption.style.display = 'none'; // Hide caption if none exists
    }
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});