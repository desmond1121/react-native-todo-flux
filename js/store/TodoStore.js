import {
  AsyncStorage
} from 'react-native';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var TodoDispatcher = require('../dispatcher/TodoDispatcher');
var TodoConstants = require('../common/TodoConstants');
var moment = require('moment');

class TodoEmitter extends EventEmitter {}

var CHANGE_EVENT = 'change';
var emitter = new TodoEmitter();

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
    this.todos[index] = todo;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  getTodos() {
    return this.todos;
  }

  loadTodosFromStorage() {
    AsyncStorage.getItem('RNTodoFlux', (err, result) => {
      if(err) {
        console.log(err);
      } else {
        if(result === null) {
          todos = [
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

var store = new TodoStore();

TodoDispatcher.register(function(action) {

  switch(action.actionType) {
    case TodoConstants.ACTION.ACTION_CREATE:
      store.addTodo(action.todo);
      store.emitChange();
      break;

    case TodoConstants.ACTION.ACTION_UPDATE:
      store.updateTodo(action.index, action.todo);
      store.emitChange();
      console.log('update ' + action.index);
      console.log(store.todos);
      break;

    case TodoConstants.ACTION.ACTION_INIT:
      store.loadTodosFromStorage();
      break;
  }
});


module.exports = store;
