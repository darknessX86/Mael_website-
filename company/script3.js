// Scroll reveal animation
const sections = document.querySelectorAll(".hero, .menu, .culture, .testimonial");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});

// Select the button element
const darkBtn = document.getElementById("darkToggle");

// Add the click event listener
darkBtn.addEventListener("click", () => {
  // Toggle the "dark" class on the body element
  document.body.classList.toggle("dark");

  // Check if dark mode is active to change the icon
  if (document.body.classList.contains("dark")) {
    darkBtn.textContent = "☀️";
  } else {
    darkBtn.textContent = "🌙";
  }
});