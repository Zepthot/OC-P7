import { clearInput, styleInput } from './utils.js';
import { renderRecipes } from './recipesGallery.js';
import { updateDropdownFilters } from './filterDropdown.js';
import { displayNoResults } from '../../templates/noResults.js';
import { recipes } from '../../data/recipes.js';

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

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (query.length < 3) {
      renderRecipes('recipes', recipes);
      const recipesSection = document.getElementById('recipes');
      recipesSection.classList.add('grid');
      recipesSection.classList.remove('d-flex');
      updateDropdownFilters(recipes);
      return;
    }

    const filteredRecipes = filterRecipesWithFilter(recipes, query);
    if (filteredRecipes.length === 0) {
      displayNoResults(query);
    } else {
      renderRecipes('recipes', filteredRecipes);
      updateDropdownFilters(filteredRecipes);
    }
  });
}

function filterRecipesWithFilter(recipes, query) {
  const lowerQuery = query.toLowerCase();

  return recipes.filter((recipe) => {
    const name = recipe.name.toLowerCase();
    const description = recipe.description.toLowerCase();
    const ingredients = recipe.ingredients.map((ing) =>
      ing.ingredient.toLowerCase()
    );

    return (
      name.includes(lowerQuery) ||
      description.includes(lowerQuery) ||
      ingredients.some((ing) => ing.includes(lowerQuery))
    );
  });
}
