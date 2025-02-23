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
