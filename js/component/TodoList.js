import React, {
    Component
} from 'react';

import {
  Text,
  View,
  ProgressBarAndroid,
  ToolbarAndroid,
  ListView
} from 'react-native';

var TodoStore = require('../store/TodoStore');
var TodoAction = require('../action/TodoAction');
var TodoConstants = require('../common/TodoConstants');
var TodoItem = require('./TodoItem');
var TodoStyle = require('../common/TodoStyle');
var assign = require('object-assign');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    TodoAction.init();
    TodoStore.registerCallback(this.onChangeData.bind(this));
  }

  componentWillUnmount() {
    TodoStore.unRegisterCallback(this.onChangeData.bind(this));
  }

  onChangeData() {
    this.setState({
      isLoading: false,
      dataSource: ds.cloneWithRows(TodoStore.getTodos())
    });
  }

  render(){
    return (
      <View style={TodoStyle.container}>
        <ToolbarAndroid
          title="RNTodoFlux"
          style={TodoStyle.toolbar}
          actions={[
            {
              title: 'Add',
              show: 'always',
              showWithText: true
            }
          ]}
          onActionSelected={(position) => this._onActionSelected(position, this.props.navigator)}
        />

        {this._renderContent.bind(this)()}

      </View>
    );
  }

  _renderContent() {
    if(this.state.isLoading) {
      return (
        <ProgressBarAndroid
          indeterminate={true}
          style={{
            flex: 1,
            alignSelf: 'center'
          }}
        />
      );
    } else {
      return (
        <ListView
          style={{
            flex: 1
          }}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => <TodoItem data={rowData} onPress={this.editTodo.bind(this, rowID, rowData)}/>}
        />
      );
    }
  }

  _onActionSelected(position, navigator) {
    if(position == 0) {
      navigator.push(TodoConstants.ROUTE.add);
    }
  }

  editTodo(index, todo) {
    var route = assign({}, TodoConstants.ROUTE.add, {
      index: index,
      todo: todo
    });
    this.props.navigator.push(route);
  }
}

module.exports = TodoList;
