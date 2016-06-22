//@flow

import {
  StyleSheet,
  PixelRatio,
  NativeModules
} from 'react-native';

export let Color = {
  colorPrimary : "#3F51B5",
  textColorPrimary : 'white'
};

export let Dimen = {
  toolbarHeight : PixelRatio.getPixelSizeForLayoutSize(20),
  statusBarHeight : PixelRatio.getPixelSizeForLayoutSize(8)
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke"
  },
  toolbar: {
    height: Dimen.toolbarHeight,
    backgroundColor: Color.colorPrimary,
    justifyContent: "center",
  }
});
