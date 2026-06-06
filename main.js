document.addEventListener('DOMContentLoaded', function() {

  // ═══ COMPTEURS ANIMÉS ═══
  function animerCompteur(id, cible, suffixe) {
    const element = document.getElementById(id);
    if (!element) return;

    let compteur = 0;
    const increment = cible / 80;

    const timer = setInterval(() => {
      compteur += increment;
      if (compteur >= cible) {
        compteur = cible;
        clearInterval(timer);
      }
      element.textContent = Math.floor(compteur)
                            .toLocaleString('fr-FR') + suffixe;
    }, 20);
  }

  // ═══ LANCER LES COMPTEURS ═══
  animerCompteur('counter-freelances', 8500, '+');
  animerCompteur('counter-entreprises', 3200, '+');
  animerCompteur('counter-projets', 3800, '+');
  animerCompteur('counter-missions', 14000, '+');
  animerCompteur('counter-pays', 10, '');
  animerCompteur('counter-satisfaction', 98, '%');

  // ═══ NAVBAR ACTIVE ═══
  const currentPage = window.location.pathname
                            .split('/').pop();
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ═══ NAVBAR OMBRE AU SCROLL ═══
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }
  });

  // ═══ ANIMATION CARTES ═══
  const fadeElements = document.querySelectorAll('.at-card');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
  });

  // ═══ FILTRES FREELANCES ═══
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.fl-item');
  const searchInput = document.getElementById('search-input');
  const noResults = document.getElementById('no-results');
  const resultCount = document.getElementById('result-count');
  let activeFilter = 'tous';

  function applyFilters() {
    if (!searchInput) return;
    const q = searchInput.value.toLowerCase().trim();
    let count = 0;
    items.forEach(item => {
      const catMatch = activeFilter === 'tous' ||
                       item.dataset.cat === activeFilter;
      const searchMatch = !q ||
                          item.dataset.name.includes(q);
      const show = catMatch && searchMatch;
      item.style.display = show ? '' : 'none';
      if (show) count++;
    });
    if (resultCount) {
      resultCount.textContent = count + ' profil' +
                                (count > 1 ? 's' : '');
    }
    if (noResults) {
      noResults.style.display = count === 0 ? 'block' : 'none';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

});

// ═══ FADE-IN AU SCROLL ═══
const fadeElements = document.querySelectorAll(
  'section, .at-card, .pricing-card, .freelance-card, .timeline-item'
);

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
  el.classList.add('fade-hidden');
  fadeObserver.observe(el);
});