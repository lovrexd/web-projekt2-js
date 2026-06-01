import { fetchMenu } from './data.js';
import { setState, getState } from './state.js';
import { setupEventListeners } from './events.js';
import { loadFromStorage } from './storage.js';

async function loadMenuData() {
  if (getState().loading) return;
  setState({ loading: true, error: null });
  try {
    // Umjetno kašnjenje od 1 sekunde za efekt učitavanja
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const stavke = await fetchMenu();
    setState({ stavke, loading: false });
  } catch (err) {
    setState({
      loading: false,
      error: 'Jelovnik trenutno nije dostupan. Pokušajte ponovno.'
    });
  }
}

async function init() {
  const savedFavorites = loadFromStorage('favorites', []);
  setState({ favorites: savedFavorites });
  setupEventListeners();
  await loadMenuData();
}

document.addEventListener('DOMContentLoaded', init);
