//@flow

const EventEmitter = require('events').EventEmitter;
const keyMirror = require('keymirror');
import {ACTION, DATE_FORMAT} from '../common/TodoConstants';
import TodoDispatcher from '../dispatcher/TodoDispatcher';
import type {Todo} from '../flow/FlowType';
import {AsyncStorage} from 'react-native';

class TodoEmitter extends EventEmitter {}
const AsyncStorageTAG : string = 'TodoFlux';
const emitter : TodoEmitter = new TodoEmitter();

type eventType = {
  DATA_CHANGE: string,
  TIME_PICKER_OPEN : string,
  TIME_PICKER_SET : string
};

class TodoStore {
  todos: Array<Todo>;

  constructor() {
    this.todos = [];
  }

  registerCallback(event: string, callback : (date ?: Date) => void ) {
    emitter.on(event, callback);
  }

  unRegisterCallback(event: string, callback : (date ?: Date) => void ) {
    emitter.removeListener(event, callback);
  }

  emitDateEvent(event: string, date: Date) {
    emitter.emit(event, date);
  }

  emitDataChange() {
    AsyncStorage.setItem(AsyncStorageTAG, JSON.stringify(this.todos), (err) => {
      if (err) {
        console.log(err);
      }
    });
    emitter.emit(TodoEvent.DATA_CHANGE);
  }

  updateTodo(index : number, todo : Object) {
    console.log(`update todo in index ${index}`);
    this.todos[index] = todo;
  }

  addTodo(todo : Object) {
    console.log(`add a todo.`);
    this.todos.push(todo);
  }

  getTodos() {
    return this.todos;
  }

  getTodo(index : number) {
    return this.todos[index];
  }

  loadTodosFromStorage() {

    AsyncStorage.getItem(
      AsyncStorageTAG,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result === null) {
            this.todos = [
              {
                title: 'Add a TODO item',
                content: 'You can add a "Todo" item by hit toolbar button, or click list item to update.',
                date: new Date()
              },
            ];
            this.emitDataChange();
          } else {
            this.todos = JSON.parse(result);
            // decode Date from json
            this.todos.forEach((todo) => {
              todo.date = new Date(todo.date);
            });
            emitter.emit(TodoEvent.DATA_CHANGE);
          }
        }
      },
    );
  }
}

let store = new TodoStore();

TodoDispatcher.register(function(action) {
  switch (action.actionType) {
    case ACTION.ACTION_CREATE:
      store.addTodo(action.todo);
      store.emitDataChange();
      console.log('add todo');
      break;

    case ACTION.ACTION_UPDATE:
      store.updateTodo(action.index, action.todo);
      store.emitDataChange();
      console.log('update ' + action.index);
      break;

    case ACTION.ACTION_INIT:
      console.log('init');
      store.loadTodosFromStorage();
      break;

    case ACTION.ACTION_TIME_PICKER_SHOW:
      store.emitDateEvent(TodoEvent.TIME_PICKER_OPEN, action.date);
      break;

    case ACTION.ACTION_TIME_PICKER_SET:
      store.emitDateEvent(TodoEvent.TIME_PICKER_SET, action.date);
      break;
  }
});

export let TodoEvent : eventType = keyMirror({
  DATA_CHANGE : null,
  TIME_PICKER_OPEN : null,
  TIME_PICKER_SET : null
});

export default store;
