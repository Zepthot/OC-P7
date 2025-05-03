export function createRecipeCard(recipe) {
  const card = document.createElement('div');
  card.className =
    'bg-white rounded-3xl overflow-hidden shadow-md flex flex-col w-96 h-[730px]';

  card.innerHTML = `
    <div class="relative">
      <img class="h-64 w-full object-cover" src="/data/images/${
        recipe.image
      }" alt="${recipe.name}">
      <span class="absolute top-5 right-5 bg-yellow-400 text-gray-800 text-xs py-1 px-4 rounded-full">${
        recipe.time
      }min</span>
    </div>
    <div class="p-6 flex flex-col gap-6 flex-1">
      <h2 class="text-lg font-[Anton] pt-2">${recipe.name}</h2>
      <div>
        <h3 class="text-xs text-gray-500 uppercase font-bold mb-4 tracking-widest">Recette</h3>
        <p class="text-sm text-gray-700 text-justify h-20 line-clamp-4">${
          recipe.description
        }</p>
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="text-xs text-gray-500 uppercase font-bold mb-3.5 tracking-widest">Ingrédients</h3>
        <ul class="text-sm text-gray-700 grid grid-cols-2 gap-5">
          ${recipe.ingredients
            .map(
              (ingredient) => `
            <li class="flex flex-col gap-px">
              <span class="font-semibold">${ingredient.ingredient}</span>
              <span class="text-gray-400">
              ${
                ingredient.quantity
                  ? `${ingredient.quantity}${
                      ingredient.unit ? ' ' + ingredient.unit : ''
                    }`
                  : '-'
              }</span>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>
    </div>
  `;

  return card;
}
