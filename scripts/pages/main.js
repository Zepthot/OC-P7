import { createSearchBar } from '../../components/searchBar.js';
import { setupSearchBarEvents } from '../../scripts/utils/searchBar.js';
import { renderRecipes } from '../../scripts/utils/recipesGallery.js';

const headerContent = document.getElementById('headerContent');

const searchBarElement = createSearchBar();
headerContent.appendChild(searchBarElement);

setupSearchBarEvents(searchBarElement);

renderRecipes('recipes');
