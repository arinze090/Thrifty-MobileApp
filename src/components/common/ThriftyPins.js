import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';

const ThriftyPins = ({optionTitle}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.thriftyColor,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 10,
        width: windowWidth / 3.7,
        // borderWidth: 1,
        // borderColor: COLORS.black,
        marginRight: 10,
        height: windowHeight / 26,
      }}
      activeOpacity={1}>
      <Text
        style={[styles.switchText, {color: COLORS.white, fontWeight: 'bold'}]}>
        {optionTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default ThriftyPins;

const styles = StyleSheet.create({});
