import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

const DataFetchingAnimation = () => {
  return (
    <View style={styles.lottieContainer}>
      <LottieView
        autoPlay={true}
        source={require('../../assets/thriftyLoader.json')}
        style={styles.lottie}
      />
    </View>
  );
};

export default DataFetchingAnimation;

const styles = StyleSheet.create({
  lottieContainer: {
    // padding: 20,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    zIndex: 999,
    // backgroundColor: 'red',
  },
  lottie: {
    width: windowWidth / 2,
    height: windowHeight / 4,
  },
});
