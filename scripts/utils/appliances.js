import { recipes } from '../../data/recipes.js';

export function extractUniqueAppareils() {
  const appareilsSet = new Set();

  recipes.forEach((recipe) => {
    if (recipe.appliance) {
      appareilsSet.add(recipe.appliance.trim().toLowerCase());
    }
  });

  const appareilsArray = [...appareilsSet].map((a) => {
    return a.charAt(0).toUpperCase() + a.slice(1);
  });

  return appareilsArray.sort((a, b) => a.localeCompare(b));
}
