import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import FormInput from '../../components/form/FormInput';
import {COLORS} from '../../theme/themes';
import FormButton from '../../components/form/FormButton';

// Redux & Apollo
import {useMutation} from '@apollo/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {emailValidator} from '../../Library/Validation';
import {FORGETPASSWORD} from '../../utils/graphql/gql-queries';
import {getForgetPassword} from '../../redux/features/user/forgetPasswordSlice';

const ForgetPassword = ({navigation, destination, props, route}) => {
  const item = route.params;

  const dispatch = useDispatch();

  const state = useSelector(state => state);

  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');

  // Forget Password Mutation
  const [forgotPasswordMutation, {loading, error, data}] =
    useMutation(FORGETPASSWORD);
  const [userId, setUserId] = useState(data);

  const handleForgetPassword = () => {
    if (email === '') {
      Alert.alert('Please enter a valid email address');
    } else {
      try {
        console.log('forgetPassword email', {email: email});
        forgotPasswordMutation({
          variables: {email: email},
          onCompleted: res => {
            console.log('forgetpass res', res);
            if (res?.forgetPassword?.success) {
              dispatch(getForgetPassword(res?.forgetPassword));

              // navigate to the ResetPasswordVerification screen after the dispatch is done
              navigation.navigate('ResetPasswordVerification', email);

              // Toast a message to the user if the code == 200 or successful
              Toast.show({
                type: 'thriftyToast',
                text2:
                  'We sent a verification code to your email. Please check',
              });
            } else {
              Alert.alert(
                'Error Occurred',
                'We encountered a problem while processing your request. Please try again or contact our support team for assistance.',
              );
            }
          },
          onError: err => {
            console.log('forgetpasds err', err);
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
        <Text style={styles.forgetTitle}>Password Recovery</Text>
        <Text style={styles.forgetSlogan}>
          Enter the email address associated with your account and we'll email
          you a 6-digit code to reset your password
        </Text>
      </View>

      {/* Authentications */}
      <View>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Email Address *</Text>
          <FormInput
            placeholder="Enter Email Address"
            placeholderTextColor="#666"
            autoCapitalize={'none'}
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={text => {
              setEmail(text);
              !emailValidator(text);
            }}
          />
        </View>
        <View style={{marginTop: 30}}>
          <FormButton
            title="Get Verification Code"
            onPress={handleForgetPassword}
            loading={loading}
            disabled={!emailValidator(email)}
          />
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;

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
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
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
    marginTop: 30,
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
});
