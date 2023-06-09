const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const doneList = document.querySelector('#done-list');

// Load existing todos from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let doneTodos = JSON.parse(localStorage.getItem('doneTodos')) || [];

// Render todos in the list
function renderTodos() {
  todoList.innerHTML = '';
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    const span = document.createElement('span');
    span.textContent = todo;
    li.appendChild(span);
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('btn-group', 'mr-2');
    const doneButton = document.createElement('button');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.innerHTML = '<i class="fas fa-check"></i>';
    doneButton.addEventListener('click', () => {
      markAsDone(todo);
    });
    buttonGroup.appendChild(doneButton);
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener('click', () => {
      deleteTodo(todo, todos);
    });
    buttonGroup.appendChild(deleteButton);
    li.appendChild(buttonGroup);

    const upButton = document.createElement('button');
    upButton.classList.add('btn', 'btn-secondary');
    upButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    upButton.addEventListener('click', () => {
      moveUp(i, todos);
    });
    buttonGroup.insertBefore(upButton, doneButton);

    const downButton = document.createElement('button');
    downButton.classList.add('btn', 'btn-secondary');
    downButton.innerHTML = '<i class="fas fa-arrow-down"></i>';
    downButton.addEventListener('click', () => {
      moveDown(i, todos);
    });
    buttonGroup.insertBefore(downButton, deleteButton);

    todoList.appendChild(li);
  }
}

// Render done todos in the list
function renderDoneTodos() {
  doneList.innerHTML = '';
  for (const todo of doneTodos) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    const span = document.createElement('span');
    span.textContent = todo;
    li.appendChild(span);
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('btn-group', 'mr-2');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener('click', () => {
      deleteTodo(todo, doneTodos);
    });
    buttonGroup.appendChild(deleteButton);
    li.appendChild(buttonGroup);
    doneList.appendChild(li);
  }
}

// Add a todo to the list
function addTodo() {
  const todo = input.value.trim();
  if (todo) {
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    input.value = '';
  }
}

// Mark a todo as done and move it to the done list
function markAsDone(todo) {
  const index = todos.indexOf(todo);
  if (index !== -1) {
    todos.splice(index, 1);
    doneTodos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
    renderTodos();
    renderDoneTodos();
  }
}

// Delete a todo from the list
function deleteTodo(todo, arr) {
  const index = arr.indexOf(todo);
  if (index !== -1) {
    arr.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
    renderTodos();
    renderDoneTodos();
  }
}

// Move a todo up in the list
function moveUp(index, arr) {
  if (index > 0) {
    const temp = arr[index - 1];
    arr[index - 1] = arr[index];
    arr[index] = temp;
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
    renderTodos();
    renderDoneTodos();
  }
}

// Move a todo down in the list
function moveDown(index, arr) {
  if (index < arr.length - 1) {
    const temp = arr[index + 1];
    arr[index + 1] = arr[index];
    arr[index] = temp;
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
    renderTodos();
    renderDoneTodos();
  }
}

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});

// Render initial todos on page load
renderTodos();
renderDoneTodos();