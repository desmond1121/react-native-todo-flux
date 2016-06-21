//@flow

import {
  StyleSheet,
  PixelRatio,
  Platform,
  NativeModules
} from 'react-native';

export let Color = {
  colorPrimary : "#1976D2"
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
    height: PixelRatio.getPixelSizeForLayoutSize(20),
    backgroundColor: Color.colorPrimary,
    justifyContent: "center",
  }
});
