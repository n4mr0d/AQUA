/**
 * AQUAEQUIPEMENT - Main Application & Interactive Logic
 * Modern Dual-Language Web Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  // Current active language: default 'fr'
  let currentLang = localStorage.getItem('aqua_lang') || 'fr';

  // DOM Elements
  const langBtns = document.querySelectorAll('.lang-btn');
  const siteHeader = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const productFilterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const specModal = document.getElementById('specModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const toastNotice = document.getElementById('toastNotice');

  // Quote Form elements
  const quoteForm = document.getElementById('quoteForm');
  const formSector = document.getElementById('formSector');
  const formService = document.getElementById('formService');
  const formCapacity = document.getElementById('formCapacity');
  const formName = document.getElementById('formName');
  const formPhone = document.getElementById('formPhone');
  const formEmail = document.getElementById('formEmail');
  const formMsg = document.getElementById('formMsg');
  const btnWhatsAppDirect = document.getElementById('btnWhatsAppDirect');

  // Summary preview elements
  const sumSector = document.getElementById('sumSector');
  const sumService = document.getElementById('sumService');
  const sumCapacity = document.getElementById('sumCapacity');

  // ==========================================
  // 1. Language Translation Engine
  // ==========================================
  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('aqua_lang', lang);
    document.documentElement.lang = lang;

    // Update active class on switcher buttons
    langBtns.forEach(btn => {
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Translate all standard text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Translate HTML contents if marked
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18n-html;
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.dataset.i18nAriaLabel;
      if (translations[lang][key]) {
        el.setAttribute('aria-label', translations[lang][key]);
      }
    });

    document.querySelectorAll('[data-i18n-aria-roledescription]').forEach(el => {
      const key = el.dataset.i18nAriaRoledescription;
      if (translations[lang][key]) {
        el.setAttribute('aria-roledescription', translations[lang][key]);
      }
    });

    // Update title
    if (lang === 'en') {
      document.title = "AQUAEQUIPEMENT | Hydromechanical Systems & Authorized ANDRITZ Agent";
    } else {
      document.title = "AQUAEQUIPEMENT | Équipements Hydromécaniques & Agent Agréé ANDRITZ";
    }

    updateQuoteSummary();
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // ==========================================
  // 2. Interactive Water Wave & Particle Canvas
  // ==========================================
  const canvas = document.getElementById('waterCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class WaterParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = Math.random() * 0.8 + 0.3;
        this.radius = Math.random() * 2.5 + 1;
        this.alpha = Math.random() * 0.4 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y > height) this.y = 0;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new WaterParticle());
    }

    let step = 0;
    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      step += 0.02;

      // Draw subtle hydraulic flow wave curves
      ctx.beginPath();
      ctx.moveTo(0, height * 0.7);
      for (let x = 0; x < width; x += 15) {
        const y = Math.sin(x * 0.005 + step) * 25 + Math.cos(x * 0.002 + step * 0.5) * 15 + height * 0.75;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(0, 163, 224, 0.12)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Second counter-wave
      ctx.beginPath();
      ctx.moveTo(0, height * 0.85);
      for (let x = 0; x < width; x += 20) {
        const y = Math.cos(x * 0.004 - step * 0.8) * 30 + height * 0.82;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }

  // ==========================================
  // 3. Header Scroll Effect & Mobile Nav
  // ==========================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  const mobileDrawer = document.getElementById('mobileNavDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer when any mobile link is clicked
    document.querySelectorAll('.mobile-nav-item, .mobile-nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('open');
      });
    });
  }

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ==========================================
  // 4. Products Filter Engine
  // ==========================================
  productFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      productFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        const category = card.dataset.category || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 5. Product Specs Modal & Quote Prefill
  // ==========================================
  document.querySelectorAll('.btn-card-spec').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      
      const pKey = card.dataset.productKey;
      const brand = card.dataset.brand;
      const dict = translations[currentLang];

      const name = dict[`${pKey}_name`] || 'Produit Hydromécanique';
      const desc = dict[`${pKey}_desc`] || '';
      const specs = dict[`${pKey}_specs`] || '';

      document.getElementById('modalBrand').textContent = brand;
      document.getElementById('modalTitle').textContent = name;
      document.getElementById('modalDesc').textContent = desc;
      document.getElementById('modalSpecs').textContent = specs;

      const modalQuoteBtn = document.getElementById('modalQuoteBtn');
      modalQuoteBtn.onclick = () => {
        closeModal();
        prefillQuoteForProduct(name);
      };

      openModal();
    });
  });

  document.querySelectorAll('.btn-card-quote').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      const pKey = card.dataset.productKey;
      const dict = translations[currentLang];
      const name = dict[`${pKey}_name`] || 'Équipement';
      prefillQuoteForProduct(name);
    });
  });

  function prefillQuoteForProduct(productName) {
    const quoteSection = document.getElementById('devis');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (formMsg) {
      const prefix = currentLang === 'en' 
        ? `Requesting technical sizing and quote for: ${productName}. Additional specs: `
        : `Demande de dimensionnement technique et devis pour : ${productName}. Caractéristiques complémentaires : `;
      formMsg.value = prefix;
      formMsg.focus();
    }
  }

  function openModal() {
    if (specModal) specModal.classList.add('open');
  }

  function closeModal() {
    if (specModal) specModal.classList.remove('open');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (specModal) {
    specModal.addEventListener('click', (e) => {
      if (e.target === specModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && specModal && specModal.classList.contains('open')) {
      closeModal();
    }
  });

  // ==========================================
  // 7. Interactive Quote Estimator & Summary
  // ==========================================
  function updateQuoteSummary() {
    if (!formSector || !formService || !sumSector || !sumService) return;
    const selectedSectorText = formSector.options[formSector.selectedIndex]?.text || '-';
    const selectedServiceText = formService.options[formService.selectedIndex]?.text || '-';
    const capVal = formCapacity.value.trim();

    sumSector.textContent = selectedSectorText;
    sumService.textContent = selectedServiceText;
    sumCapacity.textContent = capVal ? capVal : (currentLang === 'en' ? 'To be specified' : 'À définir');
  }

  if (formSector) formSector.addEventListener('change', updateQuoteSummary);
  if (formService) formService.addEventListener('change', updateQuoteSummary);
  if (formCapacity) formCapacity.addEventListener('input', updateQuoteSummary);

  // Quote Form Submission (Simulated professional submission)
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = formName.value.trim();
      const phone = formPhone.value.trim();

      if (!name || !phone) {
        showToast(currentLang === 'en' ? 'Please fill in your name and phone number.' : 'Veuillez renseigner votre nom et votre numéro de téléphone.');
        return;
      }

      showToast(translations[currentLang].form_success_msg);
      quoteForm.reset();
      updateQuoteSummary();
    });
  }

  // Direct WhatsApp Message Builder & Sender (+213 5 56 59 42 18)
  if (btnWhatsAppDirect) {
    btnWhatsAppDirect.addEventListener('click', () => {
      const sector = formSector.options[formSector.selectedIndex]?.text || '';
      const service = formService.options[formService.selectedIndex]?.text || '';
      const cap = formCapacity.value.trim() || 'Non précisé';
      const name = formName.value.trim() || 'Client AQUAEQUIPEMENT';
      const phone = formPhone.value.trim() || '';
      const email = formEmail.value.trim() || '';
      const msg = formMsg.value.trim() || '';

      const phoneTarget = "213556594218";
      let text = `*DEMANDE DE DEVIS / RFQ - AQUAEQUIPEMENT*\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `👤 *Client / Société:* ${name}\n`;
      if (phone) text += `📞 *Téléphone:* ${phone}\n`;
      if (email) text += `✉️ *Email:* ${email}\n`;
      text += `🌊 *Secteur:* ${sector}\n`;
      text += `⚙️ *Prestation:* ${service}\n`;
      text += `📊 *Capacité / Débit:* ${cap}\n`;
      if (msg) text += `📝 *Notes techniques:* ${msg}\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `_Envoyé via le portail web AQUAEQUIPEMENT 2026_`;

      const encoded = encodeURI(text);
      const url = `https://wa.me/${phoneTarget}?text=${encoded}`;
      window.open(url, '_blank');
    });
  }

  // Toast Notification Helper
  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 4500);
  }

  // Initialize Language
  setLanguage(currentLang);
});
