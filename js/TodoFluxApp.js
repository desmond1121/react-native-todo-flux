//@flow

'use strict';

import React, {
  Component
} from 'react';

import {
  Platform
} from 'react-native';

import TodoNavigator from './component/TodoNavigator';

class TodoFluxApp extends React.Component{
  render () {
    return (
      <TodoNavigator />
    );
  }
}

module.exports = TodoFluxApp;
