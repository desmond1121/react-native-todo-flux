//@flow

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ToolbarAndroid,
  TouchableWithoutFeedback,
  Platform,
  DatePickerAndroid
} from 'react-native';

import React, {
  Component
} from 'react';

const assign = require('object-assign');

import TodoStore, {
  TodoEvent
} from '../store/TodoStore';

import {
  ROUTE,
  ACTION,
  DATE_FORMAT
} from '../common/TodoConstants';
import type {Todo} from './flow/FlowType';
import TodoAction from '../action/TodoAction';
import TodoStyle from '../common/TodoStyle';
import TodoToolbar from './TodoToolbar';

class AddTodo extends React.Component {
  isEdit: boolean;
  title: string;
  todo: Todo;

  props: {
    navigator : ReactClass<Navigator>,
    index : number,
    todo ?: Todo
  };

  state: {
    date: Date
  };

  constructor(props) {
    super(props);


    if(typeof props.todo === 'undefined') {
      console.log('Add a todo');
      this.isEdit = false;
      this.todo = {
        title: 'Todo',
        date: new Date(),
        content: 'Todo Content'
      };
    } else { // update a 'Todo'
      console.log('Edit a todo:' + props.todo);
      this.isEdit = true;
      this.todo = {
        title: props.todo.title,
        date: props.todo.date,
        content: props.todo.content
      };
    }

    this.state = {
      date : this.todo.date
    };
    this.title = this.isEdit ? 'Edit todo' : 'Add todo';
    this.onTimeOpenFunc = this.onShowTimePicker.bind(this);
    this.onTimeSetFunc = this.onTimeResult.bind(this);
  }

  componentDidMount() {
    TodoStore.registerCallback(TodoEvent.TIME_PICKER_OPEN, this.onTimeOpenFunc);
    TodoStore.registerCallback(TodoEvent.TIME_PICKER_SET, this.onTimeSetFunc);
  }

  componentWillUnmount() {
    TodoStore.unRegisterCallback(TodoEvent.TIME_PICKER_OPEN, this.onTimeOpenFunc);
    TodoStore.unRegisterCallback(TodoEvent.TIME_PICKER_SET, this.onTimeSetFunc);
  }

  render(){
    return (
      <View style={TodoStyle.container}>
        <TodoToolbar
          title={this.title}
          action={{title: 'Done', show: 'always', showWithText:true}}
          onActionSelected={this.onActionSelected.bind(this)}
        />

        <View style={style.container}>
          <Text style={style.title}>Title</Text>
          <TextInput
            style={style.input}
            multiline={false}
            defaultValue={this.todo.title}
            onChangeText={(value) => this.onChangeText('title', value)}
            keyboardType='default'/>
        </View>

        <View style={style.container}>
          <Text style={style.title}>Date</Text>
          <TouchableWithoutFeedback
            onPress={() => TodoAction.showTimePicker(this.todo.date)}
            style={{
              flex: 1
            }}>
            <View style={{
              flex: 1,
              alignSelf: 'center'
            }}>
              <Text style={style.input, {
                textAlign: 'center'
              }}>{`${this.state.date.getFullYear()}-${this.state.date.getMonth()+1}-${this.state.date.getDate()}`}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={style.container}>
          <Text style={style.title}>Content</Text>
          <TextInput
            style={style.input}
            multiline={false}
            defaultValue={this.todo.content}
            onChangeText={(value) => this.onChangeText('content', value)}
            keyboardType='default'/>
        </View>
      </View>
    );
  }

  onActionSelected() : void {
    if(this.isEdit) {
      TodoAction.update(this.props.index, assign({}, this.todo));
    } else {
      TodoAction.create(assign({}, this.todo));
    }
    this.props.navigator.pop();
  }

  onChangeText(key : string, value : string) : void{
    this.todo[key] = value;
  }

  onShowTimePicker(date : Date) : void {
    console.log('open time picker at ' + Platform.OS + ' date: ' + date);

    if(Platform.OS === 'android') {
      this.showTimePickerAndroid(date);
    } else if(Platform.OS === 'ios') {
      this.showTimePickerIOS(this.props.navigator, date);
    }
  }

  onTimeResult(date : Date) : void {
    console.log('on time result : ' + date);
    this.todo.date = date;
    this.setState({
      date: date
    });
  }

  async showTimePickerAndroid(date : Date) {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: date
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        TodoAction.setTime(new Date(year, month, day));
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  showTimePickerIOS(navigator : ReactClass<Navigator>, date: Date) : void {
    let route = assign({}, ROUTE.time, {
      date : date
    });
    navigator.push(route);
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
