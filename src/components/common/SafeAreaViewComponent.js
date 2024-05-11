import {StyleSheet, SafeAreaView, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme/themes';

const SafeAreaViewComponent = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default SafeAreaViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
});
