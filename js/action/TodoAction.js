var TodoDispatcher = require('../dispatcher/TodoDispatcher');
var TodoConstants = require('../common/TodoConstants');

var TodoAction = {
  init: function() {
    TodoDispatcher.dispatch({
      actionType: TodoConstants.ACTION.ACTION_INIT
    });
  },
  create: function(todo) {
    TodoDispatcher.dispatch({
      actionType: TodoConstants.ACTION.ACTION_CREATE,
      todo: todo
    });
  },
  update: function(index, todo) {
    TodoDispatcher.dispatch({
      actionType: TodoConstants.ACTION.ACTION_UPDATE,
      todo: todo,
      index: index
    });
  }
};

module.exports = TodoAction;
