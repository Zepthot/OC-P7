export function extractUniqueIngredients(recipesList) {
  const ingredientsSet = new Set();

  recipesList.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      ingredientsSet.add(item.ingredient.trim().toLowerCase());
    });
  });

  const ingredientsArray = [...ingredientsSet].map((ing) => {
    return ing.charAt(0).toUpperCase() + ing.slice(1);
  });

  return ingredientsArray.sort((a, b) => a.localeCompare(b));
}
