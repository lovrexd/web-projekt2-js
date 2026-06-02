import { setState, getState } from './state.js';
import { saveToStorage } from './storage.js';

export function setupEventListeners() {
  const searchInput = document.querySelector('#search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      setState({ searchQuery: e.target.value, view: 'list', selectedItemId: null });
    });
  }

  const filterBtns = document.querySelectorAll('.filter-bar button');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const newFilter = btn.dataset.filter;
      saveToStorage('lastFilter', newFilter);
      setState({ filter: newFilter, view: 'list', selectedItemId: null });
    });
  });

  const container = document.querySelector('#jelovnik-container');
  if (container) {
    container.addEventListener('click', (e) => {
      if (e.target.matches('button.btn-fav')) {
        const id = Number(e.target.dataset.favId);
        let { favorites } = getState();
        
        if (favorites.includes(id)) {
          favorites = favorites.filter(f => f !== id);
        } else {
          favorites = [...favorites, id];
        }
        
        saveToStorage('favorites', favorites);
        setState({ favorites });
        return;
      }

      const tr = e.target.closest('tr.menu-row');
      if (tr) {
        const id = Number(tr.dataset.id);
        setState({ view: 'detail', selectedItemId: id });
      }
    });
  }

  const backBtn = document.querySelector('#btn-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      setState({ view: 'list', selectedItemId: null });
    });
  }


  const contactForm = document.querySelector('.form-container');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const ime = document.getElementById('kontakt-ime').value.trim();
      const email = document.getElementById('email').value.trim();
      const poruka = document.getElementById('poruka').value.trim();
      
      let msgDiv = document.querySelector('#contact-success-msg');
      if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'contact-success-msg';
        msgDiv.style.marginTop = '15px';
        msgDiv.style.fontWeight = 'bold';
        contactForm.appendChild(msgDiv);
      }
      
      if (!ime || !email || !poruka) {
        msgDiv.style.color = '#d32f2f'; // Crvena boja za grešku
        msgDiv.textContent = 'Molimo ispunite sva obavezna polja!';
      } else {
        msgDiv.style.color = '#4caf50'; // Zelena boja za uspjeh
        msgDiv.textContent = 'Poruka je uspješno poslana!';
        contactForm.reset();
      }
      
      setTimeout(() => {
        msgDiv.textContent = '';
      }, 5000);
    });
  }
}
