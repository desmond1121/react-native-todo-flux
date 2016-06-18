import {
  Navigator,
  BackAndroid
} from 'react-native';

import React, {
  Component
} from 'react';

var TodoList = require('./TodoList');
var AddTodo = require('./AddTodo');
var TodoConstants = require('../common/TodoConstants');

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if (_navigator.getCurrentRoutes().length === 1) {
    BackAndroid.exitApp();
    return false;
  }
  _navigator.pop();
  return true;
});

class TodoNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderScene(route, navigator) {
    _navigator = navigator;
    switch (route.name) {
      case "Main":
      default:
        return (<TodoList navigator={navigator}/>);

      case "Add":
        return (<AddTodo navigator={navigator} todo={route.todo} index={route.index}/>);
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={TodoConstants.ROUTE.main}
        renderScene={this._renderScene}
      />
    );
  }
}

module.exports = TodoNavigator;
