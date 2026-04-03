/* ═══════════════════════════════════════════════
   יסמין תקשורת — Shared JavaScript
   ═══════════════════════════════════════════════ */

// ─── MOBILE MENU TOGGLE ───
function toggleMobileMenu() {
  if (window.innerWidth <= 900) {
    document.getElementById('navLinks').classList.toggle('active');
    document.querySelector('.hamburger').classList.toggle('active');
  }
}

// ─── PRELOADER ───
const preloader = document.getElementById('preloader');
const hideLoader = () => {
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => { preloader.style.display = 'none'; }, 800);
  }
};
window.addEventListener('load', hideLoader);
setTimeout(hideLoader, 2500);

// ─── CUSTOM CURSOR ───
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
if (dot && outline) {
  window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    outline.style.left = e.clientX + 'px';
    outline.style.top = e.clientY + 'px';
  });
}

// ─── PROGRESS BAR & BACK TO TOP & HEADER SHRINK ───
function handleScroll() {
  let scrolled = 0;
  const openModal = document.querySelector('.modal.open');

  if (openModal && openModal.id !== 'videoModal') {
    let height = openModal.scrollHeight - openModal.clientHeight;
    if (height > 0) scrolled = (openModal.scrollTop / height) * 100;
  } else {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) scrolled = (winScroll / height) * 100;

    // Header shrink
    const header = document.querySelector('header');
    if (header) {
      if (winScroll > 50) { header.style.padding = '5px 0'; }
      else { header.style.padding = '15px 0'; }
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      if (winScroll > 500) { backToTop.classList.add('visible'); }
      else { backToTop.classList.remove('visible'); }
    }
  }

  const bar = document.getElementById("myBar");
  if (bar) bar.style.width = scrolled + "%";
}

window.addEventListener('scroll', handleScroll);
document.querySelectorAll('.modal').forEach(m => m.addEventListener('scroll', handleScroll));

// ─── FADE IN ANIMATIONS (Intersection Observer) ───
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Run counters if present
      if (entry.target.classList.contains('counters-section') && !window._hasCounted) {
        runCounters();
        window._hasCounted = true;
      }
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in, .counters-section').forEach(el => observer.observe(el));
});

// ─── COUNTERS ───
window._hasCounted = false;
function runCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const speed = target / 100;
      if (count < target) {
        counter.innerText = Math.ceil(count + speed);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + counter.getAttribute('data-suffix');
      }
    };
    updateCount();
  });
}

// ─── VIDEO FILTERING ───
function filterVideos(category, e) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  if (e && e.target) e.target.classList.add('active');

  const items = document.querySelectorAll('.video-item');
  items.forEach(item => {
    item.style.opacity = '0';
    setTimeout(() => {
      if (category === 'all' || item.classList.contains(category)) {
        item.classList.remove('hide');
        setTimeout(() => { item.style.opacity = '1'; }, 50);
      } else {
        item.classList.add('hide');
      }
    }, 300);
  });
}

// ─── MODALS ───
function playVideo(id) {
  const iframe = document.getElementById('videoIframe');
  if (iframe) {
    iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0";
    document.getElementById('videoModal').classList.add('open');
    document.body.classList.add('no-scroll');
    handleScroll();
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.classList.add('no-scroll');
    handleScroll();
  }
}

function closeModal() {
  document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('open'));
  const iframe = document.getElementById('videoIframe');
  if (iframe) iframe.src = "";
  document.body.classList.remove('no-scroll');
  handleScroll();
}

// Legacy support for existing onclick handlers
function openAboutModal() { openModal('aboutModal'); }
function openStoryModal() { openModal('memoryModal'); }

// ─── ACCESSIBILITY MENU ───
function toggleAccMenu() {
  document.getElementById('accMenu').classList.toggle('open');
}

// ─── TYPING EFFECT ───
function initTypingEffect(elementId, words) {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextSpan = document.getElementById(elementId);
  if (!typedTextSpan) return;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }
    setTimeout(typeEffect, typeSpeed);
  }
  setTimeout(typeEffect, 1000);
}

// ─── FAQ ACCORDION ───
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all others
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
});

// ─── CONTACT FORM (EmailJS) ───
function initContactForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(form);

    // EmailJS integration
    if (typeof emailjs !== 'undefined') {
      emailjs.sendForm('service_yasmin', 'template_yasmin', form)
        .then(() => {
          showFormSuccess(form);
        }, (error) => {
          alert("אופס, משהו השתבש בשליחה. נסו שוב או שלחו לי וואטסאפ!");
        });
    } else {
      // Fallback: mailto
      const name = formData.get('name') || '';
      const phone = formData.get('phone') || '';
      const message = formData.get('message') || '';
      window.location.href = `mailto:talsigronuzan@gmail.com?subject=פנייה מהאתר - ${name}&body=שם: ${name}%0Aטלפון: ${phone}%0A%0A${message}`;
      showFormSuccess(form);
    }
  });
}

function showFormSuccess(form) {
  form.style.display = "none";
  const successMsg = document.getElementById("formSuccessMessage");
  if (successMsg) {
    successMsg.style.display = "block";
    setTimeout(() => successMsg.style.opacity = "1", 50);
  }
}

// ─── SHARE BUTTON ───
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'טל סיגרון | יסמין תקשורת',
        url: 'https://talsigron.co.il/'
      });
    }
  });
}

// ─── ARTICLE MODALS (for articles page) ───
function openArticle(index) {
  openModal('articleModal' + index);
}
