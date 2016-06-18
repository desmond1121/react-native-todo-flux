import {
  Navigator,
  BackAndroid
} from 'react-native';

import React, {
  Component
} from 'react';

const TodoList = require('./TodoList');
const AddTodo = require('./AddTodo');
const TodoConstants = require('../common/TodoConstants');

let _navigator;

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
