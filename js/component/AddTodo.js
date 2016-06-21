//@flow

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ToolbarAndroid,
  TouchableWithoutFeedback,
  DatePickerAndroid
} from 'react-native';

import React, {
  Component
} from 'react';

const assign = require('object-assign');
const moment = require('moment');

import TodoAction from '../action/TodoAction';
import TodoStyle from '../common/TodoStyle';
import {ROUTE, ACTION} from '../common/TodoConstants';
import type {Todo} from '../flow/FlowType';

const _todo : Todo = {};
const index : number = -1;

class AddTodo extends React.Component {
  props: {
    index: number,
    todo: Todo
  };

  constructor(props) {
    super(props);
    if(typeof props.todo === 'undefined') {
      this.isEdit = false;
      _todo = {
        title: 'Todo',
        time: moment().format(TodoConstants.DATE_FORMAT),
        content: 'Todo Content'
      };
    } else { // update a 'Todo' object
      this.isEdit = true;
      _todo.title = props.todo.title;
      _todo.time = props.todo.time;
      _todo.content = props.todo.content;
      index = props.index;
    }

    if(this.isEdit) {
      this.title = 'Edit todo';
    } else {
      this.title = 'Add todo';
    }

    this.state = {
      time: _todo.time
    }
  }

  render(){
    return (
      <View style={TodoStyle.container}>
        <ToolbarAndroid
          title={this.title}
          style={TodoStyle.toolbar}
          actions={[{title: 'Done', show: 'always', showWithText:true}]}
          onActionSelected={this.onActionSelected.bind(this)}
        />

        <View style={style.container}>
          <Text style={style.title}>Title</Text>
          <TextInput
            style={style.input}
            multiline={false}
            defaultValue={_todo.title}
            onChangeText={(value) => this.onChangeText('title', value)}
            keyboardType='default'/>
        </View>

        <View style={style.container}>
          <Text style={style.title}>Title</Text>
          <TouchableWithoutFeedback
            onPress={this.showTimePicker.bind(this)}
            style={{
              flex: 1
            }}>
            <View style={{
              flex: 1,
              alignSelf: 'center'
            }}>
              <Text style={style.input, {
                textAlign: 'center'
              }}>{this.state.time}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={style.container}>
          <Text style={style.title}>Content</Text>
          <TextInput
            style={style.input}
            multiline={false}
            defaultValue={_todo.content}
            onChangeText={(value) => this.onChangeText('content', value)}
            keyboardType='default'/>
        </View>
      </View>
    );
  }

  onActionSelected(position) {
    if(position == 0) {
      if(this.isEdit) {
        TodoAction.update(index, assign({}, _todo));
      } else {
        TodoAction.create(assign({}, _todo));
      }
      this.props.navigator.pop();
    }
  }

  onChangeText(key, value) {
    _todo[key] = value;
  }

  async showTimePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(_todo.time)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        _todo.time = `${year}-${month+1}-${day}`;

        this.setState({
          time : _todo.time
        });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    width: 120,
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20
  }
});

module.exports = AddTodo;
