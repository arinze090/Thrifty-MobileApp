import {
  StyleSheet,
  Text,
  Platform,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';

const FormInput = ({
  leftIcon,
  iconColor = '#999',
  rightIcon,
  inputStyle,
  containerStyle,
  placeholderTextColor,
  handlePasswordVisibility,
  onPress,
  autoCapitalize,
  autoComplete,
  keyboardType,
  maxLength,
  editable,
  width,
  height,
  multiline,
  ...rest
}) => {
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {
          width: windowWidth / (width || 1.2),
          height: windowHeight / (height || 19),
        },
      ]}
      onPress={onPress}>
      {leftIcon ? (
        <Ionicons
          name={leftIcon}
          size={20}
          color={iconColor}
          style={styles.leftIcon}
        />
      ) : null}
      <TextInput
        {...rest}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, inputStyle]}
        autoCapitalize={autoCapitalize}
        // autoComplete={false}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={editable}
        multiline={multiline}
        autoCorrect={false}
      />
      {rightIcon ? (
        <TouchableOpacity
          style={{padding: 6}}
          onPress={handlePasswordVisibility}>
          <Ionicons
            name={rightIcon}
            size={20}
            color={iconColor}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: COLORS.appBackground,
    borderWidth: 1,
    borderColor: '#444',
    height: windowHeight / 16,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: 14,
    color: COLORS.appTextColor,
    height: Platform.OS == 'android' ? windowHeight / 19 : null,
    marginLeft: 10,
    // backgroundColor: 'red',
  },
  rightIcon: {
    marginLeft: 10,
    alignSelf: 'center',
    // marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
    // backgroundColor: 'red',
    height: 20,
  },
});
