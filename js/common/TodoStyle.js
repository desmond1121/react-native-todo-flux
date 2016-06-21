import {
  StyleSheet,
  PixelRatio
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke"
  },
  toolbar: {
    height: PixelRatio.getPixelSizeForLayoutSize(20),
    backgroundColor: "#1976D2",
    justifyContent: "center"
  }
});
