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
  for (const todo of todos) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = todo;
    li.appendChild(span);
    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.addEventListener('click', () => {
      markAsDone(todo);
    });
    li.appendChild(doneButton);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTodo(todo, todos);
    });
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  }
}

// Render done todos in the list
function renderDoneTodos() {
  doneList.innerHTML = '';
  for (const todo of doneTodos) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = todo;
    li.appendChild(span);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTodo(todo, doneTodos);
    });
    li.appendChild(deleteButton);
    doneList.appendChild(li);
  }
}

// Add a new todo to the list and update local storage
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
  if (index > -1) {
    doneTodos.push(todo);
    localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    renderDoneTodos();
  }
}

// Delete a todo from the list and update local storage
function deleteTodo(todo, list) {
  const index = list.indexOf(todo);
  if (index > -1) {
    list.splice(index, 1);
    if (list === todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    } else {
      localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
      renderDoneTodos();
    }
  }
}

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});

// Render initial todos
renderTodos();
renderDoneTodos();
