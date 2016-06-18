import {
  AsyncStorage
} from 'react-native';

const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
const TodoDispatcher = require('../dispatcher/TodoDispatcher');
const TodoConstants = require('../common/TodoConstants');
const moment = require('moment');

class TodoEmitter extends EventEmitter {}

const CHANGE_EVENT = 'change';
const emitter = new TodoEmitter();

class TodoStore {
  constructor() {
    this.todos = [];
  }

  registerCallback(callback) {
    emitter.on(CHANGE_EVENT, callback);
  }

  unRegisterCallback(callback) {
    emitter.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    AsyncStorage.setItem('RNTodoFlux', JSON.stringify(this.todos), (err) => {
      if(err) {
        console.log(err);
      }
    });

    emitter.emit(CHANGE_EVENT);
  }

  updateTodo(index, todo) {
    console.log(`update todo in index ${index}`);
    this.todos[index] = todo;
  }

  addTodo(todo) {
    console.log(`add a todo.`);
    this.todos.push(todo);
  }

  getTodos() {
    return this.todos;
  }

  getTodo(index) {
    return this.todos[index];
  }

  loadTodosFromStorage() {
    console.log(`load todos from local storage`);

    AsyncStorage.getItem('RNTodoFlux', (err, result) => {
      if(err) {
        console.log(err);
      } else {
        if(result === null) {
          this.todos = [
            {
              title: 'Add a TODO item',
              content: 'You can add a \"Todo\" item by hit toolbar button, or click list item to update.',
              time: moment().format(TodoConstants.DATE_FORMAT)
            }
          ];
          this.emitChange();
        } else {
          this.todos = JSON.parse(result);
          emitter.emit(CHANGE_EVENT);
        }
      }
    });
  }
}

const store = new TodoStore();

TodoDispatcher.register(function(action) {

  switch(action.actionType) {
    case TodoConstants.ACTION.ACTION_CREATE:
      store.addTodo(action.todo);
      store.emitChange();
      console.log('add todo');
      break;

    case TodoConstants.ACTION.ACTION_UPDATE:
      store.updateTodo(action.index, action.todo);
      store.emitChange();
      console.log('update ' + action.index);
      console.log(store.todos);
      break;

    case TodoConstants.ACTION.ACTION_INIT:
      console.log('init');
      store.loadTodosFromStorage();
      break;
  }
});


module.exports = store;
