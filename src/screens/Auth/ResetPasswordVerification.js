import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
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
import {FORGETPASSWORD, VERIFYRESETCODE} from '../../utils/graphql/gql-queries';
import {useDispatch, useSelector} from 'react-redux';
import ResendTimer from '../../components/form/ResendTimer';
import {
  getForgetPassword,
  getVerifyCode,
} from '../../redux/features/user/forgetPasswordSlice';
import {obscureEmail} from '../../Library/Common';

const ResetPasswordVerification = ({navigation, destination, props, route}) => {
  const item = route.params;

  const dispatch = useDispatch();
  const userId = useSelector(
    state => state?.forgetPassword?.forgetPassword?.userId,
  );

  console.log('userId', userId);

  const [verifyCode, setVerifyCode] = useState('');

  const [formError, setFormError] = useState('');

  // VerifyResetCode Mutation
  const [
    verifyResetCodeMutation,
    {loading: verifyResetLoading, error: verifyResetErr, data: verifyResetData},
  ] = useMutation(VERIFYRESETCODE);

  // VerifyResetCode onSubmit
  const onResetCodeSubmit = () => {
    if (verifyCode === '' && verifyCode?.length > 6) {
      Alert.alert('Please provide the verification code sent to your email');
    } else {
      try {
        console.log('verifyCode', {verifyCode: verifyCode});
        // dispatch the verifyCode to redux
        dispatch(getVerifyCode(verifyCode));
        verifyResetCodeMutation({
          variables: {resetCode: verifyCode, userId: userId},
          onCompleted: resetPasswordVerification => {
            console.log('resetPasswordVerification', resetPasswordVerification);

            if (resetPasswordVerification?.resetPasswordVerification?.success) {
              // navigation.navigate('ChangePassword');

              navigation.navigate('ChangePassword');

              // Toast a message to the user if the code == 200 or successful
              Toast.show({
                type: 'thriftyToast',
                text2: 'Great! Now we know it is you',
              });
            } else {
              Alert.alert(
                'Verification Failed',
                'Invalid or expired Reset Code. Please try again',
              );
            }
          },
          onError: uploadError => {
            console.log('api erorr', uploadError);
            Alert.alert(
              'Verification Failed',
              'Invalid or expired Reset Code. Please try again',
            );
          },
        });
      } catch (error) {
        setFormError('An error occured. Please try again');
      }
    }
  };

  const [forgotPasswordMutation, {loading, error, data}] =
    useMutation(FORGETPASSWORD);

  const resendVerificationCode = () => {
    try {
      console.log('email', {email: item});
      forgotPasswordMutation({
        variables: {email: item},
        onCompleted: verification => {
          console.log('verification', verification);

          if (verification?.forgetPassword?.success === true) {
            dispatch(getForgetPassword(verification?.forgetPassword));

            // Toast a message to the user if the code == 200 or successful
            Toast.show({
              type: 'thriftyToast',
              text2:
                'A verification Code was sent to you. Please check your email',
            });
          } else {
            Alert.alert(
              'Error Occurred',
              'We encountered a problem while processing your request. Please try again or contact our support team for assistance.',
            );
          }
        },
        onError: uploadError => {
          console.log('api erorr', uploadError);
          Alert.alert(
            'Error Occurred',
            'We encountered a problem while processing your request. Please try again or contact our support team for assistance.',
          );
        },
      });
    } catch (error) {
      setFormError('An error occured. Please try again');
    }
  };

  // state for resending email to the user after the time elapses
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  // resend timer state
  const [timeLeft, setTimeLeft] = useState(null);
  const [targetTime, setTargetTime] = useState(null);
  const [activeResend, setActiveResend] = useState(false);
  let resendTimeInterval;

  // To display the time
  const calculateTimeLeft = finaltime => {
    const difference = finaltime - +new Date();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      setTimeLeft(null);
      clearInterval(resendTimeInterval);
      setActiveResend(true);
    }
  };

  const triggerTimer = (targetTimeInSeconds = 120) => {
    setTargetTime(targetTimeInSeconds);
    setActiveResend(false);

    const finalTime = +new Date() + targetTimeInSeconds * 1000;
    resendTimeInterval = setInterval(
      () => (calculateTimeLeft(finalTime), 1000),
    );
  };

  const startCountDownTimer = () => {
    triggerTimer();

    return () => {
      clearInterval(resendTimeInterval);
    };
  };

  useEffect(() => {
    startCountDownTimer();
  }, []);

  const resendEmail = async () => {
    resendVerificationCode();
    startCountDownTimer();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{paddingTop: 40, marginLeft: 20}}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="whitesmoke" />
      </TouchableOpacity>

      <View style={{padding: 20, marginTop: 20}}>
        <Text style={styles.forgetTitle}>Code Verification</Text>
        <Text style={styles.forgetSlogan}>
          We have sent code to your email:{' '}
          <Text
            style={{
              color: COLORS.appTextColor,
              ontSize: 16,
              fontWeight: '900',
            }}>
            {obscureEmail(item)}
          </Text>
        </Text>
      </View>
      {/* Authentications */}
      <View style={styles.auth}>
        <Text style={styles.inputTitle}>Reset Password Code Verification</Text>
        <FormInput
          placeholder="Enter the code sent to your email"
          placeholderTextColor="#666"
          autoCapitalize="none"
          keyboardType="numeric"
          textContentType="numeric"
          maxlength={6}
          value={verifyCode}
          onChangeText={text => setVerifyCode(text)}
        />
      </View>

      <ResendTimer
        activeResend={activeResend}
        resendingEmail={resendingEmail}
        resendStatus={resendStatus}
        timeLeft={timeLeft}
        targetTime={targetTime}
        resendEmail={resendEmail}
      />

      {/* Buttons */}
      <View style={{marginTop: 30}}>
        <FormButton
          title="Verify Account"
          onPress={onResetCodeSubmit}
          loading={verifyResetLoading}
          disabled={
            verifyCode?.length < 6 ||
            verifyResetLoading ||
            verifyCode?.length > 6
          }
        />
      </View>
    </View>
  );
};

export default ResetPasswordVerification;

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
    color: 'white',
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
    color: 'white',
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
    color: 'white',
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
