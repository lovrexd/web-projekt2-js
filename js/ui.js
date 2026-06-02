import { getState } from './state.js';
import { categories } from './data.js';

const IMG_BASE = window.location.pathname.includes('/pages/')
  ? '../assets/img/'
  : 'assets/img/';

function createTableSection(catConfig, items) {
  const section = document.createElement('section');
  section.className = 'menu-section';

  const h2 = document.createElement('h2');
  h2.textContent = catConfig.label;
  section.appendChild(h2);

  const table = document.createElement('table');
  table.className = 'menu-table';

  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  ['Slika', catConfig.nameCol, catConfig.detailCol, 'Cijena', 'Favorit'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const { favorites } = getState();

  items.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'menu-row';
    tr.dataset.id = item.id;
    tr.style.cursor = 'pointer';

    const tdImg = document.createElement('td');
    const img = document.createElement('img');
    img.src = IMG_BASE + item.image;
    img.className = 'menu-img';
    img.alt = item.name;
    tdImg.appendChild(img);

    const tdName = document.createElement('td');
    tdName.textContent = item.name;

    const tdDetail = document.createElement('td');
    tdDetail.textContent = item.detail;

    const tdPrice = document.createElement('td');
    tdPrice.textContent = item.price;
    tdPrice.style.fontWeight = 'bold';

    const tdFav = document.createElement('td');
    const favBtn = document.createElement('button');
    favBtn.className = 'btn-fav';
    favBtn.dataset.favId = item.id;
    const isFav = favorites.includes(item.id);
    favBtn.textContent = isFav ? '★ Ukloni' : '☆ Dodaj';
    if (isFav) favBtn.classList.add('active-fav');
    tdFav.appendChild(favBtn);

    tr.append(tdImg, tdName, tdDetail, tdPrice, tdFav);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  section.appendChild(table);
  return section;
}

export function renderStatus() {
  const loadingEl = document.querySelector('#status-loading');
  const errorEl   = document.querySelector('#status-error');
  if (!loadingEl || !errorEl) return;

  const { loading, error } = getState();
  loadingEl.hidden = !loading;
  errorEl.hidden   = !error;
  if (error) errorEl.querySelector('p').textContent = error;
}

export function renderMenu() {
  const containerEl = document.querySelector('#jelovnik-container');
  if (!containerEl) return;

  const { stavke, filter, searchQuery, favorites, loading, error, view } = getState();

  if (view !== 'list') return;
  if (loading || error) {
    containerEl.replaceChildren();
    return;
  }

  containerEl.replaceChildren();

  let itemsToRender = stavke;

  if (searchQuery && searchQuery.trim() !== '') {
    const query = searchQuery.trim().toLowerCase();
    itemsToRender = itemsToRender.filter(item => 
      item.name.toLowerCase().includes(query)
    );
  }

  if (filter === 'favorites') {
    itemsToRender = itemsToRender.filter(item => favorites.includes(item.id));
    if (itemsToRender.length === 0) {
      if (searchQuery && searchQuery.trim() !== '') {
        containerEl.innerHTML = '<p style="text-align:center; padding: 40px;">Nema rezultata pretrage u vašim favoritima.</p>';
      } else {
        containerEl.innerHTML = '<p style="text-align:center; padding: 40px;">Nemate još dodanih favorita.</p>';
      }
      return;
    }
    const favSec = createTableSection({label: 'Vaša Omiljena Jela', nameCol: 'Jelo', detailCol: 'Opis'}, itemsToRender);
    containerEl.appendChild(favSec);
    return;
  }

  if (filter === 'all') {
    let hasItems = false;
    categories.forEach(cat => {
      if (cat.value === 'all' || cat.value === 'favorites') return;
      const catItems = itemsToRender.filter(item => item.category === cat.value);
      if (catItems.length > 0) {
        hasItems = true;
        containerEl.appendChild(createTableSection(cat, catItems));
      }
    });
    if (!hasItems) {
      containerEl.innerHTML = '<p style="text-align:center; padding: 40px;">Nema rezultata pretrage.</p>';
    }
  } else {
    const cat = categories.find(c => c.value === filter);
    const catItems = itemsToRender.filter(item => item.category === filter);
    if (cat) {
      if (catItems.length > 0) {
        containerEl.appendChild(createTableSection(cat, catItems));
      } else {
        containerEl.innerHTML = '<p style="text-align:center; padding: 40px;">Nema rezultata u ovoj kategoriji.</p>';
      }
    }
  }
}

export function renderView() {
  const viewList = document.querySelector('#view-list');
  const viewDetail = document.querySelector('#view-detail');
  if (!viewList || !viewDetail) return;

  const { view, selectedItemId, stavke } = getState();

  if (view === 'list') {
    viewList.hidden = false;
    viewDetail.hidden = true;
  } else if (view === 'detail') {
    viewList.hidden = true;
    viewDetail.hidden = false;
    
    const item = stavke.find(i => i.id === selectedItemId);
    if (item) {
      document.querySelector('#detail-img').src = IMG_BASE + item.image;
      document.querySelector('#detail-title').textContent = item.name;
      document.querySelector('#detail-desc').textContent = item.detail;
      document.querySelector('#detail-price').textContent = item.price;
    }
  }
}
