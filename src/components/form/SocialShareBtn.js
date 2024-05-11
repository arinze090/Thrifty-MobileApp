import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SocialShareButton = ({onPress, name, color}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Ionicons name={name} color={color} size={25} />
    </TouchableOpacity>
  );
};

export default SocialShareButton;

const styles = StyleSheet.create({
  btn: {
    width: windowWidth / 6,
    height: windowHeight / 15,
    borderRadius: 10,
    // alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 20,
    margin: 10,
    alignItems: 'center',
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    alignContent: 'center',
  },
});
