import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import PassMeter from 'react-native-passmeter';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import FormInput from '../../components/form/FormInput';
import {COLORS} from '../../theme/themes';
import FormButton from '../../components/form/FormButton';

// Redux & Apollo
import {useMutation} from '@apollo/react-hooks';
import {RESETPASSWORD} from '../../utils/graphql/gql-queries';
import {useDispatch, useSelector} from 'react-redux';
import {checkPassword, checkPasswordMatch} from '../../Library/Validation';

const ChangePassword = ({navigation, destination, props, route}) => {
  const item = route.params;
  console.log('loginRoute', item?.destination);

  const dispatch = useDispatch();
  const userId = useSelector(
    state => state?.forgetPassword?.forgetPassword?.userId,
  );
  const resetCode = useSelector(state => state?.forgetPassword?.verifyCode);
  console.log('resetCode', resetCode);

  // Passmeter validation
  const MAX_LEN = 15,
    MIN_LEN = 8,
    PASS_LABELS = [
      '  Too Short',
      '  Must include a lower, uppercase, number and special character like !@#$%%^&*',
      '  Must include a lower, uppercase, number and special character like !@#$%%^&*',
      '  Must include a lower, uppercase, number and special character like !@#$%%^&*',
      '  Perfecto !',
    ];
  const deviceWindow = Dimensions.get('window');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [formError, setFormError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatedPassword = checkPassword(newPassword);

  // This function handles the password visibility displaying the icons
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  // Reset Password Mutation
  const [resetPasswordMutation, {loading, error, data: resetPasswordData}] =
    useMutation(RESETPASSWORD);
  const checkPasswords = checkPasswordMatch(newPassword, confirmPassword);
  console.log('checkPasswords', checkPasswords);

  // Reset Password onSubmit
  const onResetPassword = () => {
    const data = {
      resetCode: resetCode,
      password: newPassword,
      userId: userId,
    };
    console.log('data', data);
    if (newPassword === '' || confirmPassword === '') {
      Alert.alert('Please fill in all fields');
    } else if (!validatedPassword.isValid) {
      setPasswordError(validatedPassword.cause);
    } else if (!checkPasswords) {
      setFormError('Passwords do not match, please check and retry');
    } else {
      try {
        console.log('resetPasswordMutation', data);
        resetPasswordMutation({
          variables: {resetData: data},
          onCompleted: res => {
            console.log('changepassword resss', res);
            if (res?.resetPassword?.success) {
              // navigate to the verifyPassword screen after the dispatch is done
              navigation.navigate('Login');

              // Toast a message to the user if the code == 200 or successful
              Toast.show({
                type: 'thriftyToast',
                text2:
                  'Great! You have successfully changed your password. Login now😊',
              });
            } else {
              Alert.alert(
                'Verification Failed',
                'Invalid or expired Reset Code. Please try again',
              );
            }
          },
          onError: err => {
            console.log('resetPasswordMutation error', err);
            setFormError('An error occured. Please try again');
          },
        });
      } catch (error) {
        setFormError('An error occured. Please try again');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{paddingTop: 40, marginLeft: 20}}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="whitesmoke" />
      </TouchableOpacity>

      <View style={{padding: 20, marginTop: 20}}>
        <Text style={styles.forgetTitle}>Change Password</Text>
      </View>
      {/* Authentications */}
      <View style={styles.auth}>
        <Text style={styles.inputTitle}>New Password</Text>
        <FormInput
          placeholder="Enter New password"
          placeholderTextColor="#666"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          value={newPassword}
          onChangeText={text => {
            setNewPassword(text);
            setPasswordError('');
          }}
          // onChange={handleChange}
          handlePasswordVisibility={handlePasswordVisibility}
        />

        <View
          style={{
            marginTop: -2,
            width: deviceWindow.width * 0.83,
            overflow: 'hidden',
          }}>
          {newPassword !== '' ? (
            <PassMeter
              showLabels
              password={newPassword}
              maxLength={MAX_LEN}
              minLength={MIN_LEN}
              labels={PASS_LABELS}
              backgroundColor={styles.bg}
            />
          ) : null}
        </View>
        {passwordError ? (
          <Text style={styles.validationError}>{passwordError}</Text>
        ) : null}
        <Text
          style={{
            color: '#666',
            fontSize: 12,
            marginTop: newPassword?.length ? -6 : 5,
          }}>
          Use at least 8 characters including 1 uppercase letter, a number and a
          special character like !@#$%%^&*
        </Text>
      </View>

      <View style={styles.auth}>
        <Text style={styles.inputTitle}>Confirm Password</Text>
        <FormInput
          placeholder="Enter password"
          placeholderTextColor="#666"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          // onChange={handleChange}
          handlePasswordVisibility={handlePasswordVisibility}
        />
      </View>

      {/* Buttons */}
      <View style={{marginTop: 30}}>
        <Text style={styles.error}>{formError}</Text>

        <FormButton
          title="Reset Password"
          onPress={onResetPassword}
          loading={loading}
          disabled={
            loading || newPassword.length < 5 || confirmPassword.length < 5
          }
        />
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  logo: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 120,
  },
  btn: {
    width: windowWidth / 1.2,
    height: windowHeight / 17,
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.pinky,
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnText: {
    alignSelf: 'center',
    color: COLORS.appTextColor,
    fontSize: 16,
    fontWeight: '700',
    alignContent: 'center',
  },
  bioBtn: {
    backgroundColor: '#131A22',
    width: 288,
    height: 58,
    borderRadius: 10,
    alignSelf: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bioBtnText: {
    color: COLORS.appTextColor,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 20,
  },
  biometrics: {
    marginTop: 20,
    flexDirection: 'row',
  },
  register: {
    flexDirection: 'row',
    margin: 20,
    alignSelf: 'center',
  },
  error: {
    color: 'red',
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: 7,
    fontSize: 13,
    // textAlign: 'center',
    // width: '90%',
  },
  otp: {
    backgroundColor: '#131A22',
    width: 88,
    height: 38,
    borderRadius: 22,
    alignSelf: 'center',
    marginLeft: 10,
  },
  otpText: {
    alignSelf: 'center',
    color: COLORS.appTextColor,
    fontSize: 13,
    fontWeight: '500',
    alignContent: 'center',
    marginTop: 13,
  },
  logoImage: {
    width: windowWidth / 2,
    height: windowHeight / 7,
    resizeMode: 'contain',
    marginBottom: 10,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'center',

    // marginTop: windowHeight / 9,
  },
  auth: {
    width: windowWidth / 1.2,
    alignSelf: 'center',
    // marginTop: 30,
    marginBottom: 30,
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 15,
    color: COLORS.appTextColor,
    fontWeight: '700',
  },
  logoSection: {
    flexDirection: 'row',
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  hr: {
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    width: windowWidth / 4.5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    color: COLORS.pinky,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 40,
  },
  already: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 0,
  },
  alreadyText: {
    color: COLORS.appTextColor,
    marginLeft: 25,
    marginRight: 10,
    fontWeight: '500',
    fontSize: 14,
  },
  registerText: {
    color: COLORS.pinky,
    fontWeight: '700',
    fontSize: 14,
  },
  forgetSlogan: {
    color: COLORS.appTextColor,
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 10,
  },
  forgetTitle: {
    color: COLORS.appTextColor,
    fontWeight: '800',
    fontSize: 24,
    marginLeft: 10,
    marginBottom: 20,
  },
  validationError: {
    color: 'red',
    fontWeight: '500',
    marginBottom: 15,
    fontSize: 13,
    // textAlign: 'center',
  },
});
