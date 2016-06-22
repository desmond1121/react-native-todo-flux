//@flow

import {
  Navigator,
  BackAndroid,
  Platform
} from 'react-native';
import React, {
  Component
} from 'react';
import {
  ACTION,
  ROUTE
} from '../common/TodoConstants';

import AddTodo from './AddTodo';
import TodoList from './TodoList';
import type {route} from '../flow/FlowType';
import TodoTimePickerIOS from './TodoTimePickerIOS';

let _navigator : ReactClass<Navigator>;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if (_navigator.getCurrentRoutes().length === 1) {
    BackAndroid.exitApp();
    return false;
  }

  _navigator.pop();
  return true;
});

export default class TodoNavigator extends React.Component {
  props: {

  };

  constructor(props) {
    super(props);
  }

  _renderScene(route : route, navigator : ReactClass<Navigator>) {
    _navigator = navigator;

    switch (route.name) {
      case ROUTE.main.name:
      default:
        return (<TodoList navigator={navigator} />);

      case ROUTE.add.name:
        return (<AddTodo
          navigator={navigator}
          todo={route.todo}
          index={route.index}
        />);

      case ROUTE.time.name:
        return (<TodoTimePickerIOS
          navigator={navigator}
          date={route.date}/>);
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
