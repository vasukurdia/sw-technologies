/* =============================================
   SW Technologies — Main JavaScript (Updated)
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Active nav link ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  /* ---- Sticky navbar ---- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ---- Hamburger menu ---- */
  const ham = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (ham && mobileNav) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ---- Scroll Animations ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* ---- Counter animation ---- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let count = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          count += step;
          if (count >= target) { count = target; clearInterval(timer); }
          el.textContent = count + suffix;
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ============================================
     AUTH — Navbar UI update
  ============================================= */
  updateNavbarAuth();

  function updateNavbarAuth() {
    const token = localStorage.getItem('swt_token');
    const user = JSON.parse(localStorage.getItem('swt_user') || 'null');
    const authLinks = document.getElementById('navAuthLinks');
    if (!authLinks) return;

    if (token && user) {
      authLinks.innerHTML = `
        <span class="nav-user-name"><i class="fas fa-circle-user"></i> ${user.name.split(' ')[0]}</span>
        ${user.role === 'admin' ? '<a href="admin.html" class="nav-link-admin"><i class="fas fa-shield-halved"></i> Admin</a>' : ''}
        <button class="btn btn-logout" onclick="logoutUser()"><i class="fas fa-right-from-bracket"></i> Logout</button>
      `;
    } else {
      authLinks.innerHTML = `
        <a href="login.html" class="btn btn-outline btn-sm">Login</a>
        <a href="register.html" class="btn btn-primary btn-sm">Register</a>
      `;
    }
  }

  window.logoutUser = function () {
    localStorage.removeItem('swt_token');
    localStorage.removeItem('swt_user');
    window.location.href = 'index.html';
  };

  /* ============================================
     CONTACT FORM — API submission
  ============================================= */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let valid = true;

      const fields = [
        { id: 'name',    rule: v => v.trim().length >= 2,                       msg: 'Please enter your full name (min 2 chars).' },
        { id: 'email',   rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),      msg: 'Please enter a valid email address.' },
        { id: 'phone',   rule: v => /^[\d\s\+\-\(\)]{7,15}$/.test(v.trim()),   msg: 'Please enter a valid phone number.' },
        { id: 'subject', rule: v => v !== '',                                   msg: 'Please select a subject.' },
        { id: 'message', rule: v => v.trim().length >= 20,                      msg: 'Message must be at least 20 characters.' },
      ];

      fields.forEach(({ id, rule, msg }) => {
        const group = document.getElementById(id)?.closest('.form-group');
        const input = document.getElementById(id);
        const errEl = group?.querySelector('.error-msg');
        if (!input || !group) return;
        if (!rule(input.value)) {
          group.classList.add('error');
          if (errEl) errEl.textContent = msg;
          valid = false;
        } else {
          group.classList.remove('error');
        }
      });

      if (!valid) return;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      try {
        const res = await fetch(api.contact, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
          })
        });
        const data = await res.json();

        if (data.success) {
          contactForm.style.display = 'none';
          const success = document.getElementById('formSuccess');
          if (success) success.style.display = 'block';
        } else {
          showFormError(contactForm, data.message || 'Something went wrong. Please try again.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
      } catch (err) {
        showFormError(contactForm, 'Network error. Please check your connection.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      }
    });

    contactForm.querySelectorAll('input, textarea, select').forEach(el => {
      el.addEventListener('input', () => el.closest('.form-group')?.classList.remove('error'));
    });
  }

  /* ============================================
     NEWSLETTER FORM
  ============================================= */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const msgEl = document.getElementById('newsletterMsg');
      const email = emailInput?.value?.trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMsg(msgEl, 'Please enter a valid email address.', 'error');
        return;
      }

      const btn = newsletterForm.querySelector('button');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

      try {
        const res = await fetch(api.newsletter, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        showMsg(msgEl, data.message, data.success ? 'success' : 'error');
        if (data.success) emailInput.value = '';
      } catch {
        showMsg(msgEl, 'Network error. Please try again.', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i>';
      }
    });
  }

  /* ============================================
     QUOTE MODAL
  ============================================= */
  const quoteModal = document.getElementById('quoteModal');
  const quoteForm = document.getElementById('quoteForm');

  // Open modal — all "Get a Free Quote" buttons
  document.querySelectorAll('[data-quote-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openQuoteModal();
    });
  });

  window.openQuoteModal = function () {
    if (quoteModal) {
      quoteModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeQuoteModal = function () {
    if (quoteModal) {
      quoteModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // Close on overlay click
  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeQuoteModal();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQuoteModal();
  });

  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

      const payload = {
        name:            document.getElementById('qName')?.value,
        email:           document.getElementById('qEmail')?.value,
        phone:           document.getElementById('qPhone')?.value,
        serviceRequired: document.getElementById('qService')?.value,
        budget:          document.getElementById('qBudget')?.value,
        message:         document.getElementById('qMessage')?.value,
      };

      try {
        const res = await fetch(api.quote, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
          quoteForm.style.display = 'none';
          document.getElementById('quoteSuccess').style.display = 'block';
        } else {
          const errEl = document.getElementById('quoteError');
          if (errEl) { errEl.textContent = data.message; errEl.style.display = 'block'; }
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Request';
        }
      } catch {
        const errEl = document.getElementById('quoteError');
        if (errEl) { errEl.textContent = 'Network error. Please try again.'; errEl.style.display = 'block'; }
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Request';
      }
    });
  }

  /* ---- Helpers ---- */
  function showFormError(form, msg) {
    let errBox = form.querySelector('.form-api-error');
    if (!errBox) {
      errBox = document.createElement('p');
      errBox.className = 'form-api-error';
      form.prepend(errBox);
    }
    errBox.textContent = msg;
  }

  function showMsg(el, msg, type) {
    if (!el) return;
    el.textContent = msg;
    el.className = `newsletter-msg ${type}`;
    el.style.display = 'block';
  }

});