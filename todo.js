const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('#clear-todos');

function Todo(newTodo) {
  newTodo = todoInput.value.trim();
  this.todo = newTodo;
}

Todo.prototype.addTodoToUI = function () {
  const listItem = document.createElement('li');

  const link = document.createElement('a');
  link.href = '#';
  link.className = 'delete-item';
  link.innerHTML = '<i class = "fa fa-remove"></i>';

  listItem.className = 'list-group-item d-flex justify-content-between';
  listItem.appendChild(document.createTextNode(this.todo));
  listItem.appendChild(link);

  todoList.appendChild(listItem);
  todoInput.value = ''
};
Todo.prototype.addTodoToStorage = function () {
  let todos = getTodosFromStorage();
  todos.push(this.todo);
  localStorage.setItem('todos', JSON.stringify(todos));
};

const addTodo = event => {

  const todoItem = new Todo();
  const newTodo = todoItem.todo;

  if (uniqueTodoControl(newTodo)) {
    if (newTodo === '') {
      showAlert("danger", "Please enter a todo...");
    } else {
      todoItem.addTodoToUI();
      todoItem.addTodoToStorage();
      showAlert('success', 'Todo successfully added');
    }
  }

  event.preventDefault();
};

const uniqueTodoControl = todo => {
  const todos = getTodosFromStorage();

  if (todos.includes(todo)) {
    showAlert('warning', 'This todo already added...');
    return false;
  } else {
    return true;
  }
};

const getTodosFromStorage = () => {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  return todos;
};

const addTodoToUI = function (todo) {
  const listItem = document.createElement('li');

  const link = document.createElement('a');
  link.href = '#';
  link.className = 'delete-item';
  link.innerHTML = '<i class = "fa fa-remove"></i>';

  listItem.className = 'list-group-item d-flex justify-content-between';
  listItem.appendChild(document.createTextNode(todo));
  listItem.appendChild(link);

  todoList.appendChild(listItem);
  todoInput.value = ''
};

const loadAllTodosToUI = () => {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  })
};

const deleteTodo = event => {
  if (event.target.className === 'fa fa-remove') {
    event.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(event.target.parentElement.parentElement.textContent);
    showAlert('success', 'Todo deleted succesfully')
  }
};

const deleteTodoFromStorage = deletetodo => {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem('todos', JSON.stringify(todos))
};

const filterTodos = event => {
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
};

const clearAllTodos = () => {
  if (confirm('Tümünü silmek istediğinize emin misiniz?')) {
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem('todos');
  }
};

const showAlert = (type, message) => {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1500)
};

const eventListeners = () => {
  form.addEventListener('submit', addTodo);
  document.addEventListener('DOMContentLoaded', loadAllTodosToUI);
  secondCardBody.addEventListener('click', deleteTodo);
  filter.addEventListener('keyup', filterTodos);
  clearButton.addEventListener('click', clearAllTodos);
};

eventListeners();