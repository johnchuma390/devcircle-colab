// Helpers
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Sticky header shadow on scroll
const header = $('#site-navbar');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 4);
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu toggle
const toggleBtn = $('.nav-toggle');
const menu = $('#primary-menu');
if (toggleBtn && menu) {
  toggleBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(open));
  });
  // Close menu when a link is clicked
  menu.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      menu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Smooth scroll (enhances native CSS behavior, keeps hash)
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id && $(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    }
  });
});

// FAQ accordion (accessible)
$$('.faq-item').forEach((item) => {
  const btn = $('.faq-question', item);
  const panel = $('.faq-answer', item);
  btn.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    // Close others (optional: comment to allow multi-open)
    $$('.faq-item').forEach((sib) => {
      if (sib !== item) {
        sib.classList.remove('open');
        const b = $('.faq-question', sib);
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Initialize collapsed
  item.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
});

// Simple form validation (client-side UX only; backend still receives POST)
const form = $('.contact-form');
if (form) {
  const feedback = $('.form-feedback', form);
  form.addEventListener('submit', (e) => {
    let valid = true;
    $$('.field', form).forEach((wrap) => {
      const input = $('input, textarea', wrap);
      const err = $('.error', wrap);
      if (input.hasAttribute('required') && !input.value.trim()) {
        valid = false;
        err.textContent = 'This field is required.';
      } else if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
        valid = false;
        err.textContent = 'Please enter a valid email.';
      } else {
        err.textContent = '';
      }
    });

    if (!valid) {
      e.preventDefault();
      feedback.textContent = 'Please fix the errors above.';
      return;
    }

    // Optional optimistic message; remove if you prefer a silent submit
    feedback.textContent = 'Submitting…';
  });
}
