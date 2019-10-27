const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('#clear-todos');

eventListeners();


function eventListeners() {
  form.addEventListener('submit', addTodo);
  document.addEventListener('DOMContentLoaded', loadAllTodosToUI);
  secondCardBody.addEventListener('click', deleteTodo);
  filter.addEventListener('keyup', filterTodos);
  clearButton.addEventListener('click', clearAllTodos);
}

function addTodo(event) {
  const newTodo = todoInput.value.trim();

  if (uniqueTodoControl(newTodo) === true) {
    if (newTodo === '') {
      showAlert("danger", "Please enter a todo...");
    } else {
      addTodoToUI(newTodo);
      addTodoToStorage(newTodo);
      showAlert('success', 'Todo successfully added');
    }
  }

  event.preventDefault();
}

function uniqueTodoControl(todo) {
  const todos = getTodosFromStorage();

  if (todos.includes(todo)) {
    showAlert('warning', 'This todo already added...')
    return false;
  } else {
    return true;
  }
}

function addTodoToUI(newTodo) {
  const listItem = document.createElement('li');

  const link = document.createElement('a');
  link.href = '#';
  link.className = 'delete-item';
  link.innerHTML = '<i class = "fa fa-remove"></i>';

  listItem.className = 'list-group-item d-flex justify-content-between';
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  todoList.appendChild(listItem);
  todoInput.value = ''
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromStorage() {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  return todos;
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  })
}

function deleteTodo(event) {
  if (event.target.className === 'fa fa-remove') {
    event.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(event.target.parentElement.parentElement.textContent);
    showAlert('success', 'Todo deleted succesfully')
  }
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }
  })

  localStorage.setItem('todos', JSON.stringify(todos))
}

function filterTodos(event) {
  const filterValue = event.target.value.toLowerCase();
  const listItems = document.querySelectorAll('.list-group-item');

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute('style', 'display : none !important');
    } else {
      listItem.setAttribute('style', 'display : block');
    }
  })
}

function clearAllTodos() {
  if (confirm('Tümünü silmek istediğinize emin misiniz?')) {
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem('todos');
  }
}

function showAlert(type, message) {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1500)
}

