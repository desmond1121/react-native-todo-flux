//@flow

const EventEmitter = require('events').EventEmitter;
const TodoConstants = require('../common/TodoConstants');
const TodoDispatcher = require('../dispatcher/TodoDispatcher');
const moment = require('moment');

import {AsyncStorage} from 'react-native';

class TodoEmitter extends EventEmitter { }

const CHANGE_EVENT : string = 'change';
const emitter : Object = new TodoEmitter();
let todos : Array<Object> = [];

class TodoStore {

  registerCallback(callback : function) {
    emitter.on(CHANGE_EVENT, callback);
  }

  unRegisterCallback(callback : function) {
    emitter.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    AsyncStorage.setItem('RNTodoFlux', JSON.stringify(todos), (err) => {
      if (err) {
        console.log(err);
      }
    });
    emitter.emit(CHANGE_EVENT);
  }

  updateTodo(index : number, todo : Object) {
    console.log(`update todo in index ${index}`);
    todos[index] = todo;
  }

  addTodo(todo : Object) {
    console.log(`add a todo.`);
    todos.push(todo);
  }

  getTodos() {
    return todos;
  }

  getTodo(index : number) {
    return todos[index];
  }

  loadTodosFromStorage() {
    console.log(`load todos from local storage`);
    AsyncStorage.getItem(
      'RNTodoFlux',
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result === null) {
            todos = [
              {
                title: 'Add a TODO item',
                content: 'You can add a "Todo" item by hit toolbar button, or click list item to update.',
                time: moment().format(TodoConstants.DATE_FORMAT),
              },
            ];
            this.emitChange();
          } else {
            todos = JSON.parse(result);
            emitter.emit(CHANGE_EVENT);
          }
        }
      },
    );
  }
}

const store = new TodoStore();
TodoDispatcher.register(function(action) {
  switch (action.actionType) {
    case TodoConstants.ACTION.ACTION_CREATE:
      store.addTodo(action.todo);
      store.emitChange();
      console.log('add todo');
      break;

    case TodoConstants.ACTION.ACTION_UPDATE:
      store.updateTodo(action.index, action.todo);
      store.emitChange();
      console.log('update ' + action.index);
      console.log(todos);
      break;

    case TodoConstants.ACTION.ACTION_INIT:
      console.log('init');
      store.loadTodosFromStorage();
      break;
  }
});

module.exports = store;
