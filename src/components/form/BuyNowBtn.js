import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';

const BuyNowBtn = ({disabled, onPress, title, loading}) => {
  return (
    <TouchableOpacity
      style={disabled ? styles.bookBtnDisabled : styles.bookBtn}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color={'white'} size={'small'} />
      ) : (
        <Text style={styles.btnText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default BuyNowBtn;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontWeight: '600',
    zIndex: 1000,
  },
  bookBtn: {
    backgroundColor: '#e52e04',
    borderRadius: 6,
    width: windowWidth / 2.5,
    alignSelf: 'center',
    alignItems: 'center',
    height: windowHeight / 19,
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  bookBtnDisabled: {
    // backgroundColor: COLORS.pinky,
    borderRadius: 6,
    width: windowWidth / 1.8,
    alignSelf: 'center',
    alignItems: 'center',
    height: windowHeight / 19,
    justifyContent: 'center',
    opacity: 0.1,
  },
});
