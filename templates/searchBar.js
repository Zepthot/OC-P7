export function createSearchBar() {
  const container = document.createElement('div');

  container.innerHTML = `
    <div id="searchBarContainer" class="flex items-center bg-white rounded-md shadow-lg w-full max-w-5xl">
      <input
        id="searchInput"
        type="text"
        placeholder="Rechercher une recette, un ingrédient, ..."
        class="flex-grow pl-9 text-gray-700 rounded-l-md focus:outline-none"
      />
      <button
        id="clearButton"
        class="text-gray-400 hover:text-black opacity-0 scale-90 pointer-events-none transition-all duration-300 ease-in-out mr-3.5"
      >
        ✖
      </button>
      <button
        class="p-4 bg-gray-800 rounded-md hover:bg-[#FFD15B] transition duration-300 ease-in-out m-2.5 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white group-hover:text-black transition duration-300 ease-in-out"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </button>
    </div>
  `;

  return container.firstElementChild;
}
