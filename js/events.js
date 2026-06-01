import { setState, getState } from './state.js';
import { saveToStorage } from './storage.js';

export function setupEventListeners() {
  const filterBtns = document.querySelectorAll('.filter-bar button');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      setState({ filter: btn.dataset.filter, view: 'list', selectedItemId: null });
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

  // Contact form handling
  const contactForm = document.querySelector('.form-container');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let msgDiv = document.querySelector('#contact-success-msg');
      if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'contact-success-msg';
        msgDiv.style.color = '#4caf50';
        msgDiv.style.marginTop = '15px';
        msgDiv.style.fontWeight = 'bold';
        contactForm.appendChild(msgDiv);
      }
      
      msgDiv.textContent = 'Poruka je uspješno poslana!';
      contactForm.reset();
      
      setTimeout(() => {
        msgDiv.textContent = '';
      }, 5000);
    });
  }
}
