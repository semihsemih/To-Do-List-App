const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('#clear-todos');

class Todo {
  constructor() {
    this.todo = todoInput.value.trim();
  }

  addTodoToUI() {
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
  }

  addTodoToStorage() {
    let todos = Todo.getTodosFromStorage();
    todos.push(this.todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  static uniqueTodoControl  = todo => {
    const todos = this.getTodosFromStorage();
    if (todos.includes(todo)) {
      showAlert('warning', 'This todo already added...');
      return false;
    } else {
      return true;
    }
  };

  static deleteTodo = event => {
    if (event.target.className === 'fa fa-remove') {
      event.target.parentElement.parentElement.remove();
      this.deleteTodoFromStorage(event.target.parentElement.parentElement.textContent);
      showAlert('success', 'Todo deleted successfully')
    }
  };

  static deleteTodoFromStorage = deleteTodo => {
    let todos = this.getTodosFromStorage();

    todos.forEach(function (todo, index) {
      if (todo === deleteTodo) {
        todos.splice(index, 1);
      }
    });

    localStorage.setItem('todos', JSON.stringify(todos))
  }

  static clearAllTodos() {
    if (confirm('Tümünü silmek istediğinize emin misiniz?')) {
      while (todoList.firstElementChild != null) {
        todoList.removeChild(todoList.firstElementChild);
      }
      localStorage.removeItem('todos');
    }
  };

  static getTodosFromStorage() {
    let todos;

    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
  };
}

const addTodo = event => {
  const todoItem = new Todo();

  if (Todo.uniqueTodoControl(todoItem.todo)) {
    if (todoItem.todo === '') {
      showAlert("danger", "Please enter a todo...");
    } else {
      todoItem.addTodoToUI();
      todoItem.addTodoToStorage();
      showAlert('success', 'Todo successfully added');
    }
  }

  event.preventDefault();
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
  let todos = Todo.getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  })
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
  secondCardBody.addEventListener('click', Todo.deleteTodo);
  filter.addEventListener('keyup', filterTodos);
  clearButton.addEventListener('click', Todo.clearAllTodos);
};

eventListeners();