//@flow

'use strict';

import React, {
  Component
} from 'react';


var TodoNavigator = require('./component/TodoNavigator');

class TodoFluxApp extends React.Component{
  render () {
    return (
      <TodoNavigator />
    );
  }
}

module.exports = TodoFluxApp;
