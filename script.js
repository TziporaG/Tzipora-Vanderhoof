// Highlight the nav link for the section currently in view.
const links = document.querySelectorAll('.nav nav a[href^="#"]');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + entry.target.id ? 'var(--blue)' : '';
    });
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => s && observer.observe(s));

// Fade sections in as they scroll into view.
document.documentElement.classList.add('js');
const revealEls = document.querySelectorAll('.experience > *, .placeholder > *, .job, .skill-group');
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (el.classList.contains('job') || el.classList.contains('skill-group')) {
    el.style.setProperty('--d', (Array.from(el.parentElement.children).indexOf(el) * 0.12) + 's');
  }
});
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));
