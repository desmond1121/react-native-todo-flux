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

const TodoStore = require('../store/TodoStore');
const TodoAction = require('../action/TodoAction');
const TodoConstants = require('../common/TodoConstants');
const TodoItem = require('./TodoItem');
const TodoStyle = require('../common/TodoStyle');
const assign = require('object-assign');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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
          renderRow={(rowData, sectionID, rowID) => <TodoItem data={rowData} onPress={this.editTodo.bind(this, rowID)}/>}
        />
      );
    }
  }

  _onActionSelected(position, navigator) {
    if(position == 0) {
      navigator.push(TodoConstants.ROUTE.add);
    }
  }

  editTodo(index) {
    console.log(`edit ${index}`);
    let route = assign({}, TodoConstants.ROUTE.add, {
      index: index,
      todo: TodoStore.getTodo(index)
    });
    this.props.navigator.push(route);
  }
}

module.exports = TodoList;
