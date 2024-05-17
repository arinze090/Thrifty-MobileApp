import {Image, ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../theme/themes';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/thriftyLogoo.png')}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignContent: 'center',
    // alignSelf: "center",
    alignItems: 'center',
  },
  imageBg: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    // backgroundColor: "white",
  },
  logo: {
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
