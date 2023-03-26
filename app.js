const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

// Load existing todos from local storage
const todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos in the list
function renderTodos() {
  list.innerHTML = '';
  for (const todo of todos) {
    const li = document.createElement('li');
    li.textContent = todo;
    list.appendChild(li);
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

// Handle form submission
form.addEventListener('submit', event => {
  event.preventDefault();
  addTodo();
});

// Render initial todos
renderTodos();
