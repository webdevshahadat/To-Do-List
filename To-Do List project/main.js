const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function formatTime(dateString) {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${hours}:${minutes} ${ampm}`;
}

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    const span = document.createElement('span');
    span.classList.add('todo-text');
    if (todo.done) span.classList.add('done');

    // Show text + time
    span.innerHTML = `${todo.text} <small style="color:#666; font-weight: normal; font-size: 0.8em;">(${formatTime(todo.createdAt)})</small>`;

    span.addEventListener('click', () => {
      todos[index].done = !todos[index].done;
      saveTodos();
      renderTodos();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.classList.add('btn');
    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const taskText = todoInput.value.trim();
  if (taskText !== '') {
    todos.push({ text: taskText, done: false, createdAt: new Date().toISOString() });
    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
  }
});

renderTodos();
