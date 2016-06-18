const TodoDispatcher = require('../dispatcher/TodoDispatcher');
const TodoConstants = require('../common/TodoConstants');

class TodoAction {
  init() {
    TodoDispatcher.dispatch({
      actionType: TodoConstants.ACTION.ACTION_INIT
    });
  }

  create(todo) {
    TodoDispatcher.dispatch({
      actionType: TodoConstants.ACTION.ACTION_CREATE,
      todo: todo
    });
  }

  update(index, todo) {
    TodoDispatcher.dispatch({
      actionType: TodoConstants.ACTION.ACTION_UPDATE,
      todo: todo,
      index: index
    });
  }
};

const action = new TodoAction();

module.exports = action;
