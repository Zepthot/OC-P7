export function setupSearchBarEvents(searchBarElement) {
  const searchInput = searchBarElement.querySelector('#searchInput');
  const clearButton = searchBarElement.querySelector('#clearButton');

  if (!searchInput || !clearButton) {
    console.error('Elements not found inside SearchBar element.');
    return;
  }

  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      clearButton.classList.remove(
        'opacity-0',
        'scale-90',
        'pointer-events-none'
      );
      clearButton.classList.add(
        'opacity-100',
        'scale-100',
        'pointer-events-auto'
      );
    } else {
      clearButton.classList.add('opacity-0', 'scale-90', 'pointer-events-none');
      clearButton.classList.remove(
        'opacity-100',
        'scale-100',
        'pointer-events-auto'
      );
    }
  });

  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.focus();
  });
}
