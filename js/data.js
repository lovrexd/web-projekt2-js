export async function fetchMenu() {
  try {
    const response = await fetch('../data/jelovnik.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
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
