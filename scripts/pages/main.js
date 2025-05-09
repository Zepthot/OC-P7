import { createSearchBar } from '../../components/searchBar.js';
import { setupSearchBarEvents } from '../../scripts/utils/searchBar.js';
import { renderRecipes } from '../../scripts/utils/recipesGallery.js';
import { createFilterDropdown } from '../../components/filterDropdown.js';
import { setupDropdownLogic } from '../utils/filterDropdown.js';
import { extractUniqueIngredients } from '../utils/ingredients.js';
import { extractUniqueAppareils } from '../utils/appliances.js';
import { extractUniqueUstensiles } from '../utils/ustensils.js';

const headerContent = document.getElementById('headerContent');

const searchBarElement = createSearchBar();
headerContent.appendChild(searchBarElement);

setupSearchBarEvents(searchBarElement);

const container = document.getElementById('filters');
setupFilter(container, 'Ingrédients', extractUniqueIngredients);
setupFilter(container, 'Appareils', extractUniqueAppareils);
setupFilter(container, 'Ustensiles', extractUniqueUstensiles);

renderRecipes('recipes');

function setupFilter(container, label, extractorFn) {
  const items = extractorFn();
  const { dropdown, elements } = createFilterDropdown(label, items);
  container.appendChild(dropdown);
  setupDropdownLogic(elements, items);
}
