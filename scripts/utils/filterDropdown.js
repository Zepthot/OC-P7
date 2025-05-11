import {
  addFilterTagInput,
  addFilterTagList,
  clearInput,
  styleInput,
} from './utils.js';
import { renderRecipes } from './recipesGallery.js';
import { recipes } from '../../data/recipes.js';
import { activeFilters } from './filterState.js';
import { extractUniqueIngredients } from './ingredients.js';
import { extractUniqueAppareils } from './appliances.js';
import { extractUniqueUstensiles } from './ustensils.js';
import { dropdownItemRefs } from '../pages/main.js';

export function setupDropdownLogic(elements, itemsRef, label) {
  const { toggleBtn, dropdownContent, searchInput, listEl } = elements;
  const vector = toggleBtn.querySelector('.vector-icon');

  toggleBtn.addEventListener('click', () =>
    handleToggleClick(toggleBtn, dropdownContent, vector)
  );

  searchInput.addEventListener('input', (event) =>
    handleSearchInput(event, itemsRef, listEl)
  );

  listEl.addEventListener('click', function (e) {
    handleItemClick(e, itemsRef, listEl, searchInput, dropdownContent, label);
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
  updateDropdownFilters(filtered);
}

function updateDropdownFilters(filteredRecipes) {
  const ingredients = extractUniqueIngredients(filteredRecipes);
  const appliances = extractUniqueAppareils(filteredRecipes);
  const ustensils = extractUniqueUstensiles(filteredRecipes);

  updateDropdown('ingredients', ingredients);
  dropdownItemRefs.ingredients.value = ingredients;
  updateDropdown('appliances', appliances);
  dropdownItemRefs.appliances.value = appliances;
  updateDropdown('ustensils', ustensils);
  dropdownItemRefs.ustensils.value = ustensils;
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

export function updateDropdown(label, newItems) {
  const dropdown = document.querySelector(
    `[data-type="${label}"] .dropdown-content ul`
  );

  if (!dropdown) {
    console.error(`Dropdown list for ${label} not found.`);
    return;
  }

  dropdown.innerHTML = '';

  newItems.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.className = 'px-5 py-1 cursor-pointer hover:bg-[#FFD15B]';
    dropdown.appendChild(li);
  });
}

function handleToggleClick(toggleBtn, dropdownContent, vector) {
  dropdownContent.classList.toggle('hidden');
  toggleBtn.classList.toggle('rounded-lg');
  toggleBtn.classList.toggle('rounded-t-lg');
  vector.classList.toggle('rotate-180');
}

function handleSearchInput(event, itemsRef, listEl) {
  const query = event.target.value.toLowerCase();
  const filteredItems = itemsRef.value.filter((item) =>
    item.toLowerCase().includes(query)
  );
  updateList(listEl, filteredItems);
}

function handleItemClick(
  e,
  itemsRef,
  listEl,
  searchInput,
  dropdownContent,
  label
) {
  if (e.target.tagName !== 'LI') return;

  const selectedItem = e.target.textContent;
  const items = itemsRef.value;

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
      itemsRef,
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
      itemsRef,
      updateList,
    },
    label
  );
}
