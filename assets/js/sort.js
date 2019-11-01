const listItems = () => document.querySelectorAll('.list-group-item');

const sortTodo = () => {
  listItems().forEach((listItem) => {
    listItem.addEventListener('dragstart', dragStart);
    listItem.addEventListener('dragend', dragEnd);

    listItem.addEventListener('dragover', dragOver);
    listItem.addEventListener('dragenter', dragEnter);
    listItem.addEventListener('dragleave', dragLeave);
    listItem.addEventListener('drop', dragDrop);
  })
}

let chosenItem;
let chosenItemIndex;

const dragStart = (e) => {
  const todos = Todo.getTodosFromStorage();
  chosenItem = e.target.textContent;
  chosenItemIndex = todos.indexOf(chosenItem);

  e.target.className += ' hold';
  setTimeout(() => e.target.className = 'invisible')
};

const dragEnd = (e) => {
  e.target.className = 'list-group-item d-flex justify-content-between';
};

const dragOver = (e) => {
  e.preventDefault();
};

const dragEnter = (e) => {
  e.preventDefault();
  e.target.className += ' hovered';
};

const dragLeave = (e) => {
  e.target.className = 'list-group-item d-flex justify-content-between';
};

const dragDrop = (e) => {
  e.target.className = 'list-group-item d-flex justify-content-between';
  const todos = Todo.getTodosFromStorage();
  const prevTodoIndex = todos.indexOf(e.target.textContent);
  todos.splice(chosenItemIndex, 1);
  todos.splice(prevTodoIndex, 0, chosenItem);
  localStorage.setItem('todos', JSON.stringify(todos));
  Todo.reloadAllTodosToUI();
};

const dragListeners = () => {
  document.addEventListener('DOMContentLoaded', listItems);
  document.addEventListener('DOMContentLoaded', sortTodo);
};

dragListeners();