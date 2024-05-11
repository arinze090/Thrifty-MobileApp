import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ScrollViewSpace = () => {
  return (
    <View
      style={[
        styles.section,
        {marginTop: 50, minHeight: 50, marginBottom: 100},
      ]}
    />
  );
};

export default ScrollViewSpace;

const styles = StyleSheet.create({});
