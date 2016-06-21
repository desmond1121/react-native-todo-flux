//@flow

import TodoAction from '../action/TodoAction';
import TodoItem from './TodoItem';
import TodoStore from '../store/TodoStore';
import TodoStyle from '../common/TodoStyle';
import TodoToolbar from './TodoToolbar';

import React, {Component} from 'react';
import {
  Text,
  View,
  ProgressBarAndroid,
  ListView
} from 'react-native';

import {
  ROUTE,
  ACTION
} from '../common/TodoConstants';

const assign = require('object-assign');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class TodoList extends React.Component {
  state: {
    isLoading: boolean,
    dataSource: any
  };

  props: {
    navigator: ReactClass<Navigator>
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    TodoAction.init();
    TodoStore.registerCallback(this.onChangeData.bind(this));
  }

  componentWillUnmount() {
    TodoStore.unRegisterCallback(this.onChangeData.bind(this));
  }

  render() {
    return (
        <View
        style={TodoStyle.container}>

          <TodoToolbar
            title="RNTodoFlux"
            actions={[{title: 'Add', show: 'always', showWithText: true}]}
            onActionSelected={(position) => this.onActionSelected(
              position,
              this.props.navigator,
            )}
          />

        {
          this.renderContent.bind(this)()
        }

      </View>
    );
  }

  renderContent() {
    if (this.state.isLoading) {
      return (<ProgressBarAndroid indeterminate={true} style={{
        flex: 1,
        alignSelf: 'center',
      }} />);
    } else {
      return (
        <ListView
          style={{flex: 1}}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) =>
            <TodoItem
              data={rowData}
              onPress={this.editTodo.bind(this, rowID)}
            />}
        />
      );
    }
  }

  onChangeData() : void {
    this.setState({
      isLoading: false,
      dataSource: ds.cloneWithRows(TodoStore.getTodos()),
    });
  }

  onActionSelected(position : number, navigator : ReactClass<Navigator>) : void {
    if (position == 0) {
      navigator.push(ROUTE.add);
    }
  }

  editTodo(index : number) : void {
    console.log(`edit ${index}`);
    let route = assign(
      {},
      ROUTE.add,
      {index: index, todo: TodoStore.getTodo(index)},
    );
    this.props.navigator.push(route);
  }
}
