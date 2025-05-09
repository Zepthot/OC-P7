import { recipes } from '../../data/recipes.js';

export function extractUniqueIngredients() {
  const ingredientsSet = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      ingredientsSet.add(item.ingredient.trim().toLowerCase());
    });
  });

  const ingredientsArray = [...ingredientsSet].map((ing) => {
    return ing.charAt(0).toUpperCase() + ing.slice(1);
  });

  return ingredientsArray.sort((a, b) => a.localeCompare(b));
}
