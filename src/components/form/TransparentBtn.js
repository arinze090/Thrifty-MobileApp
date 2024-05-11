import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme/themes';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

const TransparentBtn = ({
  title,
  onPress,
  disabled,
  marginBottom,
  marginTop,
  width,
  height,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        disabled ? styles.disabledBtn : styles.btn,
        {
          marginTop: marginTop,
          marginBottom: marginBottom,
          width: windowWidth / (width || 1.1),
          height: windowHeight / (height || 19),
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TransparentBtn;

const styles = StyleSheet.create({
  btn: {
    width: windowWidth / 1.2,
    height: 52,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  btnText: {
    alignSelf: 'center',
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '700',
    alignContent: 'center',
  },
  disabledBtn: {
    width: windowWidth / 1.2,
    height: 52,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.formActionBtn,
    // opacity: 0.9,
  },
});
