//@flow

import TodoDispatcher from '../dispatcher/TodoDispatcher';
import {ACTION, ROUTE} from '../common/TodoConstants';
import type {Todo} from '../flow/FlowType';

class TodoAction {
  init() {
    TodoDispatcher.dispatch({
      actionType: TodoConstants.ACTION.ACTION_INIT
    });
  }

  create(todo : Todo) {
    TodoDispatcher.dispatch({
      actionType: TodoConstants.ACTION.ACTION_CREATE,
      todo: todo
    });
  }

  update(index : number, todo : Todo) {
    TodoDispatcher.dispatch({
      actionType: TodoConstants.ACTION.ACTION_UPDATE,
      todo: todo,
      index: index
    });
  }
};

export default new TodoAction();
