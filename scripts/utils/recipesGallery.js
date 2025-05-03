import { recipes } from '../../data/recipes.js';
import { createRecipeCard } from '../../components/recipeCard.js';

export function renderRecipes(containerSelector) {
  const container = document.getElementById(containerSelector);

  if (!container) {
    console.error(`Container ${containerSelector} not found.`);
    return;
  }

  container.innerHTML = '';

  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    container.appendChild(card);
  });
}
