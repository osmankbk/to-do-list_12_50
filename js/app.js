const feedBack = document.querySelector('.feedback');
const form = document.querySelector('form');
const addItemButton = form.querySelector('button');
const itemInput = form.querySelector('#itemInput')
const itemListContainer = document.querySelector('.item-list');
const clearButton = document.querySelector('#clear-list');
let items = []
//Creating and appending to do list items;
const createItems = (itemName) => {
	const item = document.createElement('div');
	item.innerHTML = `<p>${itemName}</p>`;
	item.classList.add('item', 'my-3');
	item.innerHTML = `<h5 class="item-name text-capitalize">${itemName}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`;
	itemListContainer.parentNode.prepend(item);
	items.push(item);
}
//Error message func.
const errorMessage = () => {
	feedBack.innerHTML = '';
	let isFalse = false;
	if (itemInput.value === '') {
		isFalse = true
		feedBack.innerHTML = 'Please Enter A Valid Value';
		feedBack.classList.add('showItem', 'alert-danger');
	}
	setTimeout(() => {
		feedBack.classList.remove('showItem');
	}, 3000)
	return isFalse;
}
//Options for editing list func.
const itemEditOptions = (itemName) => {
	items.forEach(item => {
		if (item.querySelector('.item-name').textContent === itemName) {
			const completedItem = item.querySelector('.complete-item');
			completedItem.addEventListener('click', (e) => {
				const completeItemName = item.querySelector('.item-name');
				completeItemName.classList.toggle('completed');
				item.classList.toggle('visibility');
			})
			const edit = item.querySelector('.edit-item');
			edit.addEventListener('click', (e) => {
				itemInput.value = itemName;
				itemListContainer.parentNode.removeChild(item);
			})
			const deleteItem = item.querySelector('.delete-item');
			deleteItem.addEventListener('click', (e) => {
				itemListContainer.parentNode.removeChild(item);
			})
		}
	})
}
//Clear to do list function
clearButton.addEventListener('click', () => {
	items.forEach(item => {
		item.remove();
	})
})
//Submit event only runs the functions if there is no error message
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const message = errorMessage();
	const itemName = itemInput.value;
	if (!message) {
		createItems(itemName);
		itemEditOptions(itemName);
		itemInput.value = '';
	}
})