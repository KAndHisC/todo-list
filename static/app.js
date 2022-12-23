const todoList = document.querySelector('#todo-list');
const addItemForm = document.querySelector('#add-item-form');
const itemsLeft = document.querySelector('#items-left');
const panel = document.querySelector('#panel');

class Item {
    constructor(text, done) {
        this.text = text;
        this.done = done;
    }
}
var itemsStorage = {};

const itemFilter = {
    all: () => true,
    activate: item => !item.done,
    completed: item => item.done
}
var item_filter = itemFilter.all;

todoList.addEventListener('click', event => {
    if (event.target.className === 'mark-done') {
        const item = event.target.parentNode;
        if (event.target.checked) {
            item.style.backgroundColor = 'orange';
        } else {
            item.style.backgroundColor = 'transparent';
        }

        const id = item.id;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/api/mark/${id}`, false);
        xhr.send();
        success = JSON.parse(xhr.responseText)['success'];
        if (success) {
            itemsStorage[id].done = !itemsStorage[id].done;
        }
        count_item_left();
    }
});

todoList.addEventListener('click', event => {
    if (event.target.className === 'delete') {
        const item = event.target.parentNode;
        const id = item.id;
        
        item.remove();

        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/api/delete/${id}`, false);
        xhr.send();
        success = JSON.parse(xhr.responseText)['success'];
        if (success) {
            delete itemsStorage[id];
        }
        count_item_left();
    }
});

function createNewRow(id, text) {
    const newRow = document.createElement('li');
    newRow.innerHTML = `
        <input type="checkbox" class="mark-done">
            <label class="item">${text}</label>
        <button class="delete">Delete</button>
    `;
    newRow.setAttribute('id', id);
    return newRow;
}


addItemForm.addEventListener('submit', event => {
    event.preventDefault();

    const newItemInput = document.querySelector('#new-item-input');
    const newItemText = newItemInput.value;

    if (newItemText === '') {
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/add/${newItemText}`, false);
    xhr.send();
    const id = JSON.parse(xhr.responseText)['id'];
    if (id != null) {
        const newRow = createNewRow(id, newItemText);
        todoList.appendChild(newRow);
        itemsStorage[id] = new Item(newItemText, false);
    }
    newItemInput.value = '';
    count_item_left();
});

function count_item_left() {
    let count = 0;
    for (const id in itemsStorage) {
        if (!itemsStorage[id].done) {
            count++;
        }
    }
    itemsLeft.innerHTML = `${count} items left`;
}

function show_items() {
    todoList.innerHTML = '';
    for (const id in itemsStorage) {
        const item = itemsStorage[id];

        const newRow = createNewRow(id, item.text);
        todoList.appendChild(newRow);
        if (!item_filter(item)) {
            document.getElementById(id).style.display = 'none';
        } else {
            if (item.done) {
                document.getElementById(id).style.backgroundColor = 'orange';
                document.getElementById(id).getElementsByClassName('mark-done')[0].checked = item.done;
            }
            document.getElementById(id).style.display = 'flex';
        }
    }
}

panel.addEventListener('click', event => {
    const filter = event.target.className;
    if (filter === 'all') {
        item_filter = itemFilter.all;
    } else if (filter === 'activate') {
        item_filter = itemFilter.activate;
    } else if (filter === 'completed') {
        item_filter = itemFilter.completed;
    } else if (filter === 'clear') {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/api/clear`, false);
        xhr.send();
        success = JSON.parse(xhr.responseText)['success'];
        if (success) {
            for (const id in itemsStorage) {
                if (itemsStorage[id].done) {
                    delete itemsStorage[id];
                }
            }
        }
        count_item_left();
    }
    show_items();
});


function init() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/items", false);
    xhr.send();
    const items = JSON.parse(xhr.responseText)['items'];
    for (let i = 0; i < items.length; i++) {
        itemsStorage[items[i][0]] = new Item(items[i][1], !!items[i][2]);
    }
    show_items();
    count_item_left();
}

onload = init;