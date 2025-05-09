import {
  addFilterTagInput,
  addFilterTagList,
  clearInput,
  styleInput,
} from './utils.js';

export function setupDropdownLogic(elements, items) {
  const { toggleBtn, dropdownContent, searchInput, listEl } = elements;
  const vector = toggleBtn.querySelector('.vector-icon');

  toggleBtn.addEventListener('click', () =>
    handleToggleClick(toggleBtn, dropdownContent, vector)
  );

  searchInput.addEventListener('input', (event) =>
    handleSearchInput(event, items, listEl)
  );

  listEl.addEventListener('click', function (e) {
    handleItemClick(e, items, listEl, searchInput, dropdownContent);
  });

  const clearButton = dropdownContent.querySelector('#clearButton');

  if (!searchInput || !clearButton) {
    console.error('Elements not found inside SearchBar element.');
    return;
  }

  searchInput.addEventListener('input', () =>
    styleInput(searchInput, clearButton, 'scale-50', 'scale-60')
  );

  clearButton.addEventListener('click', () => clearInput(searchInput));
}

function updateList(listEl, filteredItems) {
  listEl.innerHTML = '';
  filteredItems.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.className = 'px-5 py-1 cursor-pointer hover:bg-[#FFD15B]';
    listEl.appendChild(li);
  });
}

function handleToggleClick(toggleBtn, dropdownContent, vector) {
  dropdownContent.classList.toggle('hidden');
  toggleBtn.classList.toggle('rounded-lg');
  toggleBtn.classList.toggle('rounded-t-lg');
  vector.classList.toggle('rotate-180');
}

function handleSearchInput(event, items, listEl) {
  const query = event.target.value.toLowerCase();
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query)
  );
  updateList(listEl, filteredItems);
}

function handleItemClick(e, items, listEl, searchInput, dropdownContent) {
  if (e.target.tagName !== 'LI') return;

  const selectedItem = e.target.textContent;

  const index = items.indexOf(selectedItem);
  if (index !== -1) {
    items.splice(index, 1);
  }

  const query = searchInput.value.toLowerCase();
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query)
  );
  updateList(listEl, filteredItems);

  const selectedContainer = dropdownContent.querySelector('#filter-selected');
  addFilterTagInput(selectedContainer, selectedItem, {
    searchInput,
    listEl,
    items,
    updateList,
  });
  const activeFiltersContainer = document.getElementById('active-filters');
  addFilterTagList(activeFiltersContainer, selectedItem, {
    searchInput,
    listEl,
    items,
    updateList,
  });
}
