const React = require('React');
const StyleSheet = require('StyleSheet');
const Text = require('Text.react');
const TouchableHighlight = require('TouchableHighlight.react');
const View = require('View.react');

import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

class TodoItem extends React.Component {
  render() {
    return (
      <TouchableHighlight
      style={style.todoItem}
      onPress={this.props.onPress}
      underlayColor="lightgray">

        <View>
          <Text style={style.todoItemTitle}>{this.props.data.title}</Text>
          <Text style={style.todoItemTime}>{this.props.data.time}</Text>
          <Text style={style.todoItemContent}>{this.props.data.content}</Text>
        </View>

    </TouchableHighlight>);
  }
}

const style = StyleSheet.create({
  todoItem: {marginTop: 4, padding: 10, backgroundColor: 'white'},
  todoItemTitle: {fontSize: 20, color: 'black'},
  todoItemTime: {fontSize: 14, marginTop: 4, color: 'darkgray'},
  todoItemContent: {fontSize: 18, marginTop: 10, color: 'darkslategrey'},
});
module.exports = TodoItem;
