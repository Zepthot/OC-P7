export function clearInput(input) {
  input.value = '';
  input.dispatchEvent(new Event('input'));
  input.focus();
}

export function styleInput(searchInput, clearButton, scale1, scale2) {
  if (searchInput.value.length > 0) {
    clearButton.classList.remove('opacity-0', scale1, 'pointer-events-none');
    clearButton.classList.add('opacity-100', scale2, 'pointer-events-auto');
  } else {
    clearButton.classList.add('opacity-0', scale1, 'pointer-events-none');
    clearButton.classList.remove('opacity-100', scale2, 'pointer-events-auto');
  }
}

export function addFilterTagInput(container, selectedItem, options) {
  const { searchInput, listEl, items, updateList } = options;

  const tag = document.createElement('div');
  tag.className =
    'flex items-center justify-between gap-2 px-4 py-2 bg-[#FFD15B] text-black cursor-pointer transition group hover:font-bold';
  tag.textContent = selectedItem;
  tag.dataset.item = selectedItem.toLowerCase();

  const removeBtn = document.createElement('span');
  removeBtn.textContent = '✖';
  removeBtn.className =
    'w-6 h-6 rounded-full bg-[#FFD15B] text-black flex items-center justify-center text-sm transition group-hover:bg-black group-hover:text-[#FFD15B]';

  tag.addEventListener('click', () =>
    handleRemoveTag(selectedItem, items, searchInput, listEl, updateList)
  );

  tag.appendChild(removeBtn);
  container.appendChild(tag);
}

export function addFilterTagList(container, selectedItem, options) {
  const { searchInput, listEl, items, updateList } = options;

  const tag = document.createElement('div');
  tag.className =
    'flex items-center justify-between bg-[#FFD15B] p-4 rounded-lg text-black text-sm font-medium transition hover:font-bold cursor-pointer group';
  tag.textContent = selectedItem;
  tag.dataset.item = selectedItem.toLowerCase();

  const removeBtn = document.createElement('span');
  removeBtn.textContent = '✖';
  removeBtn.className =
    'ml-4 font-bold text-xl transition rounded-full w-6 h-6 flex items-center justify-center group-hover:bg-black group-hover:text-[#FFD15B]';

  tag.addEventListener('click', () =>
    handleRemoveTag(selectedItem, items, searchInput, listEl, updateList)
  );

  tag.appendChild(removeBtn);
  container.appendChild(tag);
}

function handleRemoveTag(selectedItem, items, searchInput, listEl, updateList) {
  const tags = document.querySelectorAll(
    `[data-item="${selectedItem.toLowerCase()}"]`
  );
  tags.forEach((tag) => tag.remove());

  if (!items.includes(selectedItem)) {
    items.push(selectedItem);
    items.sort((a, b) => a.localeCompare(b));
  }

  const query = searchInput.value.toLowerCase();
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query)
  );
  updateList(listEl, filteredItems);
}
