//@flow

import React, {
  Component
} from 'react';

import {
  DatePickerIOS,
  View
} from 'react-native';

import TodoStyle from '../common/TodoStyle';
import TodoToolbar from './TodoToolbar';
import TodoAction from '../action/TodoAction';

export default class TodoTimePickerIOS extends React.Component {
  state: {
    date: Date
  };
  props: {
    date : Date,
    navigator : ReactClass<Navigator>
  };

  constructor(props) {
    super(props);
    this.state = {
      date : props.date
    };
  }

  render() {
    return (
      <View style={TodoStyle.container, {
        flexDirection: 'column'
      }}>
        <TodoToolbar
          title='Pick date'
          action={{
            title: 'Done'
          }}
          onActionSelected={this.onActionSelected.bind(this)}/>
        <DatePickerIOS
          date={this.state.date}
          mode='date'
          onDateChange={(date) => this.onDateChange.bind(this)(date)} />
      </View>
    )
  }

  onActionSelected() : void {
    this.props.navigator.pop();
    TodoAction.setTime(this.state.date);
  }

  onDateChange(date : Date) : void {
    this.setState({
      date: date
    });
  }
}
