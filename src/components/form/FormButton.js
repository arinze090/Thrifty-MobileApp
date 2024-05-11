import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme/themes';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

const FormButton = ({
  title,
  onPress,
  disabled,
  marginBottom,
  marginTop,
  width,
  loading,
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
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text style={styles.btnText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  btn: {
    width: windowWidth / 1.2,
    height: 52,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.thriftyColor,
  },
  btnText: {
    alignSelf: 'center',
    color: COLORS.formActionBtnText,
    fontSize: 16,
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
    backgroundColor: COLORS.thriftyColor,
    // opacity: 0.9,
  },
});
