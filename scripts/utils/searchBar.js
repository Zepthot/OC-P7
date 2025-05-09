import { clearInput, styleInput } from './utils.js';

export function setupSearchBarEvents(searchBarElement) {
  const searchInput = searchBarElement.querySelector('#searchInput');
  const clearButton = searchBarElement.querySelector('#clearButton');

  if (!searchInput || !clearButton) {
    console.error('Elements not found inside SearchBar element.');
    return;
  }

  searchInput.addEventListener('input', () =>
    styleInput(searchInput, clearButton, 'scale-90', 'scale-100')
  );

  clearButton.addEventListener('click', () => clearInput(searchInput));
}
