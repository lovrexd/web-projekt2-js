import { jelovnikData } from '../data/jelovnik.js';

export async function fetchMenu() {
  // Vraća podatke direktno iz datoteke umjesto da ih fetch-a
  return jelovnikData;
}

export const categories = [
  { value: 'all',          label: 'Sve',                   nameCol: 'Jelo',    detailCol: 'Opis' },
  { value: 'predjela',     label: 'Predjela & Juhe',       nameCol: 'Jelo',    detailCol: 'Opis' },
  { value: 'odresci',      label: 'Vrhunski Odresci',      nameCol: 'Jelo',    detailCol: 'Gramatura' },
  { value: 'glavna',       label: 'Glavna Jela',           nameCol: 'Jelo',    detailCol: 'Opis' },
  { value: 'salate',       label: 'Salate',                nameCol: 'Salata',  detailCol: 'Opis' },
  { value: 'prilozi',      label: 'Prilozi',               nameCol: 'Prilog',  detailCol: 'Opis' },
  { value: 'pica',         label: 'Vinska Karta & Pića',   nameCol: 'Piće',    detailCol: 'Količina' }
];
