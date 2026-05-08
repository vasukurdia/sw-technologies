document.addEventListener("DOMContentLoaded", () => {
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach((a) => {
    if (a.getAttribute("href") === currentPage) a.classList.add("active");
  });

  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  });

  const ham = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  if (ham && mobileNav) {
    ham.addEventListener("click", () => {
      ham.classList.toggle("open");
      mobileNav.classList.toggle("open");
    });
    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        ham.classList.remove("open");
        mobileNav.classList.remove("open");
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || "";
          let count = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.textContent = count + suffix;
          }, 25);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => counterObserver.observe(c));

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const fields = [
        {
          id: "name",
          rule: (v) => v.trim().length >= 2,
          msg: "Please enter your full name (min 2 chars).",
        },
        {
          id: "email",
          rule: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
          msg: "Please enter a valid email address.",
        },
        {
          id: "phone",
          rule: (v) => /^[\d\s\+\-\(\)]{7,15}$/.test(v.trim()),
          msg: "Please enter a valid phone number.",
        },
        {
          id: "subject",
          rule: (v) => v !== "",
          msg: "Please select a subject.",
        },
        {
          id: "message",
          rule: (v) => v.trim().length >= 20,
          msg: "Message must be at least 20 characters.",
        },
      ];

      fields.forEach(({ id, rule, msg }) => {
        const group = document.getElementById(id)?.closest(".form-group");
        const input = document.getElementById(id);
        const errEl = group?.querySelector(".error-msg");
        if (!input || !group) return;

        if (!rule(input.value)) {
          group.classList.add("error");
          if (errEl) errEl.textContent = msg;
          valid = false;
        } else {
          group.classList.remove("error");
        }
      });

      if (valid) {
        contactForm.style.display = "none";
        const success = document.getElementById("formSuccess");
        if (success) success.style.display = "block";
      }
    });

    contactForm.querySelectorAll("input, textarea, select").forEach((el) => {
      el.addEventListener("input", () => {
        el.closest(".form-group")?.classList.remove("error");
      });
    });
  }
});
