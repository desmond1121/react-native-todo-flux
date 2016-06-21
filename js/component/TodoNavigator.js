//@flow

import {
  ACTION,
  ROUTE
} from '../common/TodoConstants';

import AddTodo from './AddTodo';
import TodoList from './TodoList';

import {Navigator, BackAndroid} from 'react-native';
import React, {Component} from 'react';
import type {route} from '../flow/FlowType';

let _navigator : ReactClass<Navigator>;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if (_navigator.getCurrentRoutes().length === 1) {
    BackAndroid.exitApp();
    return false;
  }

  _navigator.pop();
  return true;
});

class TodoNavigator extends React.Component {
  props: {

  };

  constructor(props) {
    super(props);
  }

  _renderScene(route : route, navigator : ReactClass<Navigator>) {
    _navigator = navigator;

    switch (route.name) {
      case 'Main':
      default:
        return (<TodoList navigator={navigator} />);

      case 'Add':
        return (<AddTodo
          navigator={navigator}
          todo={route.todo}
          index={route.index}
        />);
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={ROUTE.main}
        renderScene={this._renderScene} />
      );
  }
}

module.exports = TodoNavigator;
