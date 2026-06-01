import { renderMenu, renderStatus, renderView } from './ui.js';

const state = {
  stavke: [],
  filter: 'all',
  favorites: [],
  loading: false,
  error: null,
  view: 'list',
  selectedItemId: null
};

export function setState(newState) {
  if (!newState || typeof newState !== 'object') return;
  try {
    Object.assign(state, newState);
    renderStatus();
    renderMenu();
    renderView();
  } catch (error) {
    console.warn('Greška pri postavljanju stanja (setState):', error);
  }
}

export function getState() {
  return state;
}
