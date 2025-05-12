import { createSearchBar } from '../../templates/searchBar.js';
import { setupSearchBarEvents } from '../../scripts/utils/searchBar.js';
import { renderRecipes } from '../../scripts/utils/recipesGallery.js';
import { createFilterDropdown } from '../../templates/filterDropdown.js';
import { setupDropdownLogic } from '../utils/filterDropdown.js';
import { extractUniqueIngredients } from '../utils/ingredients.js';
import { extractUniqueAppareils } from '../utils/appliances.js';
import { extractUniqueUstensiles } from '../utils/ustensils.js';

import { recipes } from '../../data/recipes.js';

export const dropdownItemRefs = {};

const headerContent = document.getElementById('headerContent');

const searchBarElement = createSearchBar();
headerContent.appendChild(searchBarElement);

setupSearchBarEvents(searchBarElement);

let filteredRecipes = [...recipes];

updateInterface(filteredRecipes);

function setupFilter(container, label, extractorFn, type) {
  const itemsRef = { value: extractorFn(filteredRecipes) };
  dropdownItemRefs[type] = itemsRef;
  const { dropdown, elements } = createFilterDropdown(
    label,
    itemsRef.value,
    type
  );
  container.appendChild(dropdown);
  setupDropdownLogic(elements, itemsRef, type);
}

function updateInterface(filteredRecipes) {
  renderRecipes('recipes', filteredRecipes);

  const container = document.getElementById('filters');
  container.innerHTML = '';

  setupFilter(
    container,
    'Ingrédients',
    extractUniqueIngredients,
    'ingredients',
    filteredRecipes
  );
  setupFilter(
    container,
    'Appareils',
    extractUniqueAppareils,
    'appliances',
    filteredRecipes
  );
  setupFilter(
    container,
    'Ustensiles',
    extractUniqueUstensiles,
    'ustensils',
    filteredRecipes
  );
}
