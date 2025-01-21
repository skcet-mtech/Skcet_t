const form = document.getElementById('itemForm');
const input = document.getElementById('itemInput');
const itemList = document.getElementById('itemList');

// Fetch items from the backend
async function fetchItems() {
  const response = await fetch('http://localhost:5000/api/items');
  const items = await response.json();
  itemList.innerHTML = '';
  items.forEach((item) => {
	const li = document.createElement('li');
	li.textContent = item.name;
	itemList.appendChild(li);
  });
}

// Add a new item
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newItem = { name: input.value };
  await fetch('http://localhost:5000/api/items', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify(newItem),
  });
  input.value = '';
  fetchItems();
});

// Initial fetch
fetchItems();
