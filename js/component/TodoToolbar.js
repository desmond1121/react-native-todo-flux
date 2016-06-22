//@flow

import React, {
  Component,
} from 'react';

import {
  View,
  ToolbarAndroid,
  Platform,
  Text,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

import TodoStyle, {
  Color,
  Dimen
} from '../common/TodoStyle';

let toolbarHeight = ((Platform.OS === 'android' && Platform.Version >= 21 ) || Platform.OS === 'ios') ? Dimen.toolbarHeight + Dimen.statusBarHeight : Dimen.toolbarHeight;
type toolbarAction = {
  title : string,
  show ?: string,
  showWithText ?: boolean
}

export default class TodoToolbar extends React.Component{
  props : {
    title: string,
    action: toolbarAction,
    onActionSelected: () => void
  };

  render() {
    return (
      <View style={{
        justifyContent: 'flex-end',
        flexDirection: 'column',
        elevation: 2,
        backgroundColor: Color.colorPrimary,
        height: toolbarHeight
      }}>
        <View style={style.toolbar}>
          <Text style={style.title}>{this.props.title}</Text>
          <TouchableWithoutFeedback
            onPress={this.props.onActionSelected}>
            <View style={style.action}>
              <Text style={style.actionText}>{this.props.action.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }

}


let style = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    height: Dimen.toolbarHeight,
    backgroundColor: Color.colorPrimary,
    justifyContent: "center",
  },
  title: {
    flex: 3,
    marginLeft: 10,
    fontSize: 20,
    color: Color.textColorPrimary,
    textAlign: Platform.OS === 'android' ? 'left' : 'center',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1}
  },
  action: {
    marginRight: 10,
  },
  actionText: {
    fontSize: 18,
    color: Color.textColorPrimary,
  }
});
