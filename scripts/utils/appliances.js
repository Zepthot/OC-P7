export function extractUniqueAppareils(recipesList) {
  const appareilsSet = new Set();

  recipesList.forEach((recipe) => {
    if (recipe.appliance) {
      appareilsSet.add(recipe.appliance.trim().toLowerCase());
    }
  });

  const appareilsArray = [...appareilsSet].map((a) => {
    return a.charAt(0).toUpperCase() + a.slice(1);
  });

  return appareilsArray.sort((a, b) => a.localeCompare(b));
}
