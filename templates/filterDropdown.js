export function createFilterDropdown(title, items, type) {
  const dropdown = document.createElement('div');
  dropdown.className = 'filter-dropdown relative w-full max-w-xs';

  dropdown.innerHTML = `
    <button class="filter-toggle w-full p-4 bg-white rounded-lg shadow text-left flex justify-between items-center font-medium gap-16">
      <span>${title}</span>
      <img src="/assets/vector.png" alt="Open dropdown" class="vector-icon" />
    </button>
    <div class="dropdown-content hidden absolute z-10 bg-white w-full rounded-b-lg shadow">
      <div class="border-2 rounded-sm border-gray-400 flex mx-4 mb-3.5">
        <input
          id="searchInput"
          type="text"
          placeholder="Rechercher"
          class="filter-search flex-grow text-gray-700 focus:outline-none w-full py-0.5 px-2 text-sm"
        />
        <button
          id="clearButton"
          class="text-gray-400 hover:text-black opacity-0 scale-90 pointer-events-none transition-all duration-300 ease-in-out"
        >
          ✖
        </button>
        <button
          class="m-2.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5 text-gray-400"
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
      <div id="filter-selected" class="mb-3"></div>
      <ul class="filter-list max-h-56 overflow-y-auto"></ul>
    </div>
  `;

  const elements = {
    toggleBtn: dropdown.querySelector('.filter-toggle'),
    dropdownContent: dropdown.querySelector('.dropdown-content'),
    searchInput: dropdown.querySelector('.filter-search'),
    listEl: dropdown.querySelector('.filter-list'),
  };

  renderItemList(elements.listEl, items);
  dropdown.setAttribute('data-type', type);

  return { dropdown, elements };
}

function renderItemList(listEl, items) {
  listEl.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.className = 'px-5 py-1 cursor-pointer hover:bg-[#FFD15B]';
    listEl.appendChild(li);
  });
}
