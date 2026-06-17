  // Header scroll
    const hdr = document.getElementById('hdr');
    window.addEventListener('scroll', () => { hdr.classList.toggle('scr', window.scrollY > 50) }, { passive: true });

    // Mobile menu
    const hmb = document.getElementById('hmb'), mobn = document.getElementById('mobn');
    hmb.addEventListener('click', () => {
      const o = mobn.classList.toggle('on');
      hmb.classList.toggle('on', o);
      hmb.setAttribute('aria-expanded', String(o));
    });
    document.querySelectorAll('.ml').forEach(l => {
      l.addEventListener('click', () => {
        mobn.classList.remove('on');
        hmb.classList.remove('on');
        hmb.setAttribute('aria-expanded', 'false');
      });
    });

    // Scroll animations
    const obs = new IntersectionObserver(e => {
      e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); obs.unobserve(x.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.aos').forEach(el => obs.observe(el));

    // FAQ accordion
    document.querySelectorAll('.faqq').forEach(q => {
      const act = () => {
        const it = q.parentElement, was = it.classList.contains('on');
        document.querySelectorAll('.faqit').forEach(i => {
          i.classList.remove('on');
          i.querySelector('.faqq').setAttribute('aria-expanded', 'false');
        });
        if (!was) { it.classList.add('on'); q.setAttribute('aria-expanded', 'true'); }
      };
      q.addEventListener('click', act);
      q.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        window.scrollTo({ top: t.offsetTop - hdr.offsetHeight - 16, behavior: 'smooth' });
      });
    });

    // Show/hide "outro" field for perfil select
    function toggleOutro(sel, targetId) {
      const el = document.getElementById(targetId);
      if (!el) return;
      el.classList.toggle('hidden', sel.value !== 'outro');
    }

    // Show/hide "outro" checkbox service field
    function toggleOutroSrv(cb) {
      const el = document.getElementById('outro-srv');
      if (!el) return;
      el.classList.toggle('hidden', !cb.checked);
    }

    // Form submit → WhatsApp
    document.getElementById('ctform').addEventListener('submit', function (e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value || 'não informado';
      const wpp = document.getElementById('wpp').value || '';
      const perfil = document.getElementById('perfil').value || 'não informado';
      const fase = document.getElementById('fase').value || 'não informado';
      const desafio = document.getElementById('desafio').value || '';
      const checked = [...document.querySelectorAll('input[name="srv"]:checked')].map(c => c.value).join(', ') || 'não informado';
      const urgencia = document.getElementById('urgencia').value || 'não informado';
      const text = encodeURIComponent(
        'Olá, equipe MX3!\n\nEntrei em contato pelo site:\n\n'
        + 'Nome: ' + nome + '\nWhatsApp: ' + wpp
        + '\nPerfil: ' + perfil + '\nFase atual: ' + fase
        + '\nServiços de interesse: ' + checked
        + '\nQuando quer começar: ' + urgencia
        + '\nDesafio principal: ' + desafio
        + '\n\nAguardo o contato da equipe MX3.'
      );
      window.open('https://wa.me/5521998121345?text=' + text, '_blank');
    });