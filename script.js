// -----------------------------------------------------------
// 1. DARK / LIGHT MODE TOGGLE
//    Adds or removes the "dark" class on <body>.
//    Persists the user's choice in localStorage.
// -----------------------------------------------------------
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');

// Check if user previously chose dark mode
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
}

function toggleTheme() {
  body.classList.toggle('dark');
  // Save preference
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);


// -----------------------------------------------------------
// 2. MOBILE HAMBURGER MENU
//    Toggles the mobile navigation overlay.
//    Closes when a link is clicked.
// -----------------------------------------------------------
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
  // Prevent body scroll when menu is open
  body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    body.style.overflow = '';
  });
});


// -----------------------------------------------------------
// 3. SHOW/HIDE MOBILE THEME TOGGLE
//    On smaller screens, show the mobile toggle button
//    since the desktop nav (with its toggle) is hidden.
// -----------------------------------------------------------
function handleResize() {
  if (window.innerWidth <= 768) {
    themeToggleMobile.style.display = 'flex';
  } else {
    themeToggleMobile.style.display = 'none';
    // Close mobile menu if resizing to desktop
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    body.style.overflow = '';
  }
}
window.addEventListener('resize', handleResize);
handleResize(); // Run on load


// -----------------------------------------------------------
// 4. FADE-IN ON SCROLL (IntersectionObserver)
//    Elements with the "fade-in" class will fade in
//    when they scroll into view.
// -----------------------------------------------------------
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, {
  threshold: 0.15,   // Trigger when 15% of the element is visible
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(function (el) {
  observer.observe(el);
});
