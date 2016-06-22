//@flow

import TodoDispatcher from '../dispatcher/TodoDispatcher';
import {ACTION, ROUTE} from '../common/TodoConstants';
import type {Todo} from '../flow/FlowType';

class TodoAction {
  init() : void{
    TodoDispatcher.dispatch({
      actionType: ACTION.ACTION_INIT
    });
  }

  create(todo : Todo) : void {
    TodoDispatcher.dispatch({
      actionType: ACTION.ACTION_CREATE,
      todo: todo
    });
  }

  update(index : number, todo : Todo) : void {
    TodoDispatcher.dispatch({
      actionType: ACTION.ACTION_UPDATE,
      todo: todo,
      index: index
    });
  }

  /**
   * TimePicker set time.
   */
  showTimePicker(date : Date) : void {
    TodoDispatcher.dispatch({
      actionType: ACTION.ACTION_TIME_PICKER_SHOW,
      date: date
    });
  }

  /**
   * TimePicker set time.
   */
  setTime(date : Date) : void {
    TodoDispatcher.dispatch({
      actionType: ACTION.ACTION_TIME_PICKER_SET,
      date: date
    });
  }
};

export default new TodoAction();
