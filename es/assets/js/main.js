// LUMIONIS - Script Principal (ES - España)
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Iconos Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Navbar en Scroll
  const navbar = document.getElementById('main-nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('bg-[#05050a]/95', 'border-white/10', 'shadow-2xl', 'backdrop-blur-xl');
        navbar.classList.remove('bg-transparent', 'border-transparent');
      } else {
        navbar.classList.remove('bg-[#05050a]/95', 'border-white/10', 'shadow-2xl', 'backdrop-blur-xl');
        navbar.classList.add('bg-transparent', 'border-transparent');
      }
    });
  }

  // 3. Menú Móvil (Apertura y cierre fluido)
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        requestAnimationFrame(() => {
          mobileMenu.classList.add('active');
        });
        mobileToggle.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Hero Particle Canvas (Contenido al ancho exacto)
  const canvas = document.getElementById('hero-canvas');
  if (canvas && canvas.parentElement) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = Math.min(canvas.parentElement.offsetWidth, window.innerWidth);
    let height = canvas.height = canvas.parentElement.offsetHeight;

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = Math.min(canvas.parentElement.offsetWidth, window.innerWidth);
        height = canvas.height = canvas.parentElement.offsetHeight;
      }
    });

    const particles = [];
    const count = window.innerWidth < 768 ? 20 : 50;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(0, 245, 255, ' : 'rgba(139, 92, 246, '
      });
    }

    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    function render() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.7)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 95) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.16 * (1 - dist / 95)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(render);
    }
    render();
  }

  // 5. Observer de Scroll para Animaciones
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-6');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-6');
    observer.observe(el);
  });

  // 6. Formulario de Contacto (ES - Asesor Comercial Jhonatans en España)
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nome = document.getElementById('nome').value.trim();
      const empresa = document.getElementById('empresa').value.trim();
      const email = document.getElementById('email').value.trim();
      const whatsapp = document.getElementById('whatsapp').value.trim();
      const servico = document.getElementById('servico').value;
      const mensagem = document.getElementById('mensagem').value.trim();

      if (!nome || !email || !mensagem) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
      }

      let textoMsg = `*Contacto LUMIONIS - España*\n\n`;
      textoMsg += `*Nombre:* ${nome}\n`;
      if (empresa) textoMsg += `*Empresa:* ${empresa}\n`;
      textoMsg += `*E-mail:* ${email}\n`;
      if (whatsapp) textoMsg += `*Teléfono / WhatsApp:* ${whatsapp}\n`;
      textoMsg += `*Servicio de interés:* ${servico}\n\n`;
      textoMsg += `*Mensaje:*\n${mensagem}`;

      const zapUrl = `https://wa.me/34664207148?text=${encodeURIComponent(textoMsg)}`;

      if (formFeedback) {
        formFeedback.innerHTML = `
          <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex flex-col gap-3">
            <div class="flex items-center gap-2 font-medium">
              <span class="text-base">✓</span>
              <span>¡Solicitud preparada con éxito!</span>
            </div>
            <p class="text-xs text-zinc-300">
              Para atención comercial directa con Jhonatans (Asesor Comercial en España), pulse el botón para abrir la conversación en WhatsApp:
            </p>
            <a href="${zapUrl}" target="_blank" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors">
              <span>Continuar en WhatsApp con Jhonatans (+34 664 20 71 48)</span> →
            </a>
          </div>
        `;
        formFeedback.classList.remove('hidden');
      }

      window.open(zapUrl, '_blank');
    });
  }
});
