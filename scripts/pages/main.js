import { createSearchBar } from '../../components/searchBar.js';
import { setupSearchBarEvents } from '../../scripts/utils/searchBar.js';

const headerContent = document.getElementById('headerContent');

const searchBarElement = createSearchBar();
headerContent.appendChild(searchBarElement);

setupSearchBarEvents(searchBarElement);
