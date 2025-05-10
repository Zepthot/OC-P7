import { createSearchBar } from '../../components/searchBar.js';
import { setupSearchBarEvents } from '../../scripts/utils/searchBar.js';
import { renderRecipes } from '../../scripts/utils/recipesGallery.js';
import { createFilterDropdown } from '../../components/filterDropdown.js';
import { setupDropdownLogic } from '../utils/filterDropdown.js';
import { extractUniqueIngredients } from '../utils/ingredients.js';
import { extractUniqueAppareils } from '../utils/appliances.js';
import { extractUniqueUstensiles } from '../utils/ustensils.js';

import { recipes } from '../../data/recipes.js';

const headerContent = document.getElementById('headerContent');

const searchBarElement = createSearchBar();
headerContent.appendChild(searchBarElement);

setupSearchBarEvents(searchBarElement);

const container = document.getElementById('filters');
setupFilter(container, 'Ingrédients', extractUniqueIngredients, 'ingredients');
setupFilter(container, 'Appareils', extractUniqueAppareils, 'appliances');
setupFilter(container, 'Ustensiles', extractUniqueUstensiles, 'ustensils');

renderRecipes('recipes', recipes);

function setupFilter(container, label, extractorFn, type) {
  const items = extractorFn();
  const { dropdown, elements } = createFilterDropdown(label, items);
  container.appendChild(dropdown);
  setupDropdownLogic(elements, items, type);
}
