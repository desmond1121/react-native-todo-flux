//@flow

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import type {Todo} from '../flow/FlowType';

class TodoItem extends React.Component {
  props: {
    data: Todo,
    onPress: () => void
  };

  render() {
    return (
      <TouchableHighlight
        style={style.todoItem}
        onPress={this.props.onPress}
        underlayColor="lightgray">

        <View>
          <Text style={style.todoItemTitle}>{this.props.data.title}</Text>
          <Text style={style.todoItemTime}>{this.getDateStr.bind(this)()}</Text>
          <Text style={style.todoItemContent}>{this.props.data.content}</Text>
        </View>

    </TouchableHighlight>);
  }

  getDateStr() : string {
    let date : Date = this.props.data.date;
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}

const style : ReactClass<StyleSheet> = StyleSheet.create({
  todoItem: {marginTop: 4, padding: 10, backgroundColor: 'white'},
  todoItemTitle: {fontSize: 20, color: 'black'},
  todoItemTime: {fontSize: 14, marginTop: 4, color: 'darkgray'},
  todoItemContent: {fontSize: 18, marginTop: 10, color: 'darkslategrey'},
});

module.exports = TodoItem;
