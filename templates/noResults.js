export function displayNoResults(query) {
  const recipesSection = document.getElementById('recipes');
  recipesSection.classList.remove('grid');
  recipesSection.classList.add('d-flex');

  recipesSection.innerHTML = `
    <div class="text-center text-gray-700 w-full">
      <p class="text-xl font-semibold mb-4">
        Aucune recette ne contient « <span class="text-red-500">${query}</span> »
      </p>
      <p class="text-md text-gray-500">
        Vous pouvez essayer des recherches comme :
        <span class="italic">tarte aux pommes</span>,
        <span class="italic">poisson</span>,
        <span class="italic">poulet</span>, etc.
      </p>
    </div>
  `;
}
