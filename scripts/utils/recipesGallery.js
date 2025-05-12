import { createRecipeCard } from '../../templates/recipeCard.js';

export function renderRecipes(containerSelector, arrayFiltred) {
  const container = document.getElementById(containerSelector);

  if (!container) {
    console.error(`Container ${containerSelector} not found.`);
    return;
  }

  container.innerHTML = '';

  arrayFiltred.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    container.appendChild(card);
  });

  document.getElementById('recipeCount').textContent = arrayFiltred.length;
}
