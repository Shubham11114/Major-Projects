(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
// Script for navbar by akhilesh

const searchToggle = document.getElementById("searchToggle");
const mobileSearch = document.getElementById("mobileSearch");
const closeSearch = document.getElementById("closeSearch");

searchToggle.addEventListener("click", () => {
  mobileSearch.classList.add("show");
});

closeSearch.addEventListener("click", () => {
  mobileSearch.classList.remove("show");
});

searchToggle.addEventListener("click", () => {
  mobileSearch.classList.add("show");
});

closeSearch.addEventListener("click", () => {
  mobileSearch.classList.remove("show");
});

// ADD THIS BELOW
document.addEventListener("click", function (event) {
  const searchBox = document.getElementById("mobileSearch");
  const searchToggle = document.getElementById("searchToggle");

  if (
    searchBox.classList.contains("show") &&
    !searchBox.contains(event.target) &&
    !searchToggle.contains(event.target)
  ) {
    searchBox.classList.remove("show");
  }
});

// ---------------------------
// Hero Slider Logic (Auto + Manual)
// ---------------------------
let nextBtn = document.getElementById("hero-next");
let prevBtn = document.getElementById("hero-prev");

let slider = document.querySelector(".hero-slider");
let sliderList = document.querySelector(".hero-slider .hero-list");
let thumbnail = document.querySelector(".hero-slider .hero-thumbnail");

let isAnimating = false; // avoid double triggers

function moveSlider(direction) {
  if (isAnimating) return;
  isAnimating = true;

  let sliderItems = sliderList.querySelectorAll(".hero-item");
  let thumbItems = thumbnail.querySelectorAll(".hero-item");

  if (direction === "next") {
    sliderList.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbItems[0]);
    slider.classList.add("next");
  } else {
    sliderList.prepend(sliderItems[sliderItems.length - 1]);
    thumbnail.prepend(thumbItems[thumbItems.length - 1]);
    slider.classList.add("prev");
  }
}

// event listener (only once)
slider.addEventListener(
  "animationend",
  () => {
    slider.classList.remove("next");
    slider.classList.remove("prev");
    isAnimating = false;
  }
);

// Manual buttons
nextBtn.onclick = () => moveSlider("next");
prevBtn.onclick = () => moveSlider("prev");

// ---------------------------
// Auto Slider Feature
// ---------------------------
let autoSlideInterval = 4000; // 4 seconds
let autoSlide = setInterval(() => moveSlider("next"), autoSlideInterval);

// Pause auto-slider while user interacts
function resetAutoSlider() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => moveSlider("next"), autoSlideInterval);
}

nextBtn.addEventListener("click", resetAutoSlider);
prevBtn.addEventListener("click", resetAutoSlider);

// ---------------------------
// Keyboard Support (Optional)
// ---------------------------
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    moveSlider("next");
    resetAutoSlider();
  }
  if (e.key === "ArrowLeft") {
    moveSlider("prev");
    resetAutoSlider();
  }
});



// ---------------------------
// Thumbnail Click → Open That Slide First
// ---------------------------
document.querySelectorAll(".hero-thumbnail .hero-item").forEach((thumb, index) => {
    thumb.addEventListener("click", () => {

        if (isAnimating) return;
        isAnimating = true;

        let sliderItems = sliderList.querySelectorAll(".hero-item");
        let thumbItems = thumbnail.querySelectorAll(".hero-item");

        // STEP 1: Convert NodeList → Array for easy rotation
        sliderItems = Array.from(sliderItems);
        thumbItems = Array.from(thumbItems);

        // STEP 2: Rotate both arrays until clicked one becomes first
        while (thumbnail.firstElementChild !== thumb) {
            sliderList.appendChild(sliderList.firstElementChild);
            thumbnail.appendChild(thumbnail.firstElementChild);
        }

        // STEP 3: Trigger animation
        slider.classList.add("next");

        // Reset auto slider
        resetAutoSlider();
    });
});


// ---------------------------
// Slider Indicators with Timer Progress (FIXED)
// ---------------------------
let indicatorContainer = document.querySelector(".hero-indicators");
let totalSlides = document.querySelectorAll(".hero-list .hero-item").length;

// Create indicators
indicatorContainer.innerHTML = "";
for (let i = 0; i < totalSlides; i++) {
    let dot = document.createElement("div");
    dot.classList.add("indicator");
    dot.innerHTML = `<div class="progress"></div>`;
    indicatorContainer.appendChild(dot);
}

let indicators = document.querySelectorAll(".indicator");
let currentIndex = 0;

// Reset all indicators CLEANLY
function resetIndicators() {
    indicators.forEach(ind => {
        ind.classList.remove("active");
        const p = ind.querySelector(".progress");

        // Remove transition first
        p.style.transition = "none";
        p.style.width = "0%";

        // Force reflow so browser resets animation
        void p.offsetWidth;

        // Re-enable transition
        p.style.transition = `width ${autoSlideInterval}ms linear`;
    });
}

// Start animation on ONLY the selected indicator
function startIndicator(index) {
    resetIndicators();

    indicators[index].classList.add("active");
    let bar = indicators[index].querySelector(".progress");

    // Set progress animation
    bar.style.width = "100%";
}

// Auto-update indicator when slider moves forward
function updateIndicatorNext() {
    currentIndex = (currentIndex + 1) % totalSlides;
    startIndicator(currentIndex);
}

// Auto-update indicator when slider moves backward
function updateIndicatorPrev() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    startIndicator(currentIndex);
}

// Manual next/prev buttons
nextBtn.addEventListener("click", updateIndicatorNext);
prevBtn.addEventListener("click", updateIndicatorPrev);

// Auto slider also updates indicator
setInterval(updateIndicatorNext, autoSlideInterval);

// Clicking indicator → go to specific slide
indicators.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        if (isAnimating) return;

        // Rotate slides until selected index is first
        while (currentIndex !== index) {
            moveSlider("next");
            currentIndex = (currentIndex + 1) % totalSlides;
        }

        startIndicator(index);
        resetAutoSlider();
    });
});

// Start first indicator
startIndicator(0);
