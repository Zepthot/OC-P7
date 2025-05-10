import {
  addFilterTagInput,
  addFilterTagList,
  clearInput,
  styleInput,
} from './utils.js';
import { renderRecipes } from './recipesGallery.js';
import { recipes } from '../../data/recipes.js';
import { activeFilters } from './filterState.js';

export function setupDropdownLogic(elements, items, label) {
  const { toggleBtn, dropdownContent, searchInput, listEl } = elements;
  const vector = toggleBtn.querySelector('.vector-icon');

  toggleBtn.addEventListener('click', () =>
    handleToggleClick(toggleBtn, dropdownContent, vector)
  );

  searchInput.addEventListener('input', (event) =>
    handleSearchInput(event, items, listEl)
  );

  listEl.addEventListener('click', function (e) {
    handleItemClick(e, items, listEl, searchInput, dropdownContent, label);
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

export function updateFilteredRecipes() {
  const filtered = recipes.filter((recipe) => {
    const { ingredients, appliance, ustensils } = recipe;

    const recipeIngredients = ingredients.map((i) =>
      i.ingredient.toLowerCase()
    );
    const matchesIngredients = [...activeFilters.ingredients].every((filter) =>
      recipeIngredients.includes(filter)
    );

    const matchesAppliance = [...activeFilters.appliances].every((filter) =>
      appliance.toLowerCase().includes(filter)
    );

    const recipeUstensils = ustensils.map((u) => u.toLowerCase());
    const matchesUstensils = [...activeFilters.ustensils].every((filter) =>
      recipeUstensils.includes(filter)
    );

    return matchesIngredients && matchesAppliance && matchesUstensils;
  });

  renderRecipes('recipes', filtered);
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

function handleItemClick(
  e,
  items,
  listEl,
  searchInput,
  dropdownContent,
  label
) {
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
  addFilterTagInput(
    selectedContainer,
    selectedItem,
    {
      searchInput,
      listEl,
      items,
      updateList,
    },
    label
  );
  const activeFiltersContainer = document.getElementById('active-filters');
  addFilterTagList(
    activeFiltersContainer,
    selectedItem,
    {
      searchInput,
      listEl,
      items,
      updateList,
    },
    label
  );
}
