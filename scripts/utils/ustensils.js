export function extractUniqueUstensiles(recipesList) {
  const ustensilesSet = new Set();

  recipesList.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensilesSet.add(ustensil.trim().toLowerCase());
    });
  });

  const ustensilesArray = [...ustensilesSet].map((u) => {
    return u.charAt(0).toUpperCase() + u.slice(1);
  });

  return ustensilesArray.sort((a, b) => a.localeCompare(b));
}
