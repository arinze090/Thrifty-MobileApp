import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import FormInput from '../../components/form/FormInput';
import {COLORS} from '../../theme/themes';
import FormButton from '../../components/form/FormButton';
import SocialButton from '../../components/form/SocialButton';

// Redux & Apollo
import {useMutation} from '@apollo/react-hooks';
import {
  LOGIN,
  LOGIN_WITH_FACEID,
  SOCIAL_MEDIA_AUTH,
} from '../../utils/graphql/gql-queries';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {getUser, setUserDestination} from '../../redux/features/user/userSlice';

import {useIsFocused} from '@react-navigation/native';
import {emailValidator} from '../../Library/Validation';

const LoginScreen = ({navigation, destination, props, route}) => {
  const item = route.params;
  console.log('loginRoute', item?.destination);

  const state = useSelector(state => state);
  console.log('state', state.user);

  const dispatch = useDispatch();
  const focused = useIsFocused();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [formError, setFormError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  // Login Mutation
  const [
    loginMutation,
    {data: userData, loading: loginLoader, error: loginMutationError},
  ] = useMutation(LOGIN);

  const handleLogin = () => {
    if (!emailValidator(email) || password.length < 8) {
      setFormError('Invalid username or password. Please check and retry');
    } else {
      try {
        console.log('login data', {
          email: email,
          password: password,
        });
        loginMutation({
          variables: {email: email, password: password},
          onCompleted: async data => {
            // if (data?.getCategories?.length > 0) {
            //   dispatch(getCategories({categories: data?.getCategories}));
            //   dispatch(categoriesFetchLoading(false));
            // }
            console.log('Login dataaa', data);

            if (!data?.login?.success) {
              setFormError(data?.login?.message);
              Toast.show({
                type: 'thriftyToast',
                text2: 'Login Failed',
              });
            } else {
              dispatch(getUser(data?.login));
              Toast.show({
                type: 'thriftyToast',
                text2: 'Login Successful. Welcome Back!',
              });
              setEmail('');
              setPassword('');
              navigation.navigate('HomeStack', {screen: 'HomeScreen'});
            }
          },
          onError: error => {
            console.log('Login error', error);
          },
        });
      } catch (error) {
        console.log('loginMutation err 2', loginMutationError, error);
        setFormError('Invalid login. Check your login details and retry');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
      style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={{paddingTop: 40, marginLeft: 20, marginBottom: 30}}
        />
        <TouchableOpacity style={styles.faceIDContainer}>
          <Image
            style={{
              borderRadius: 10,
              width: windowWidth / 1.8,
              height: windowHeight / 12,
              resizeMode: 'cover',
              // backgroundColor: 'red',
            }}
            source={require('../../assets/thriftyLogoo.png')}
          />
        </TouchableOpacity>

        {/* Authentications */}
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Email Address</Text>
          <FormInput
            placeholder="Enter Email Address"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setFormError('');
              if (!emailValidator(text)) {
                setEmailError('Please enter a valid email');
              } else {
                setEmailError('');
              }
            }}
            width={1.2}
          />
          {emailError ? (
            <Text style={styles.validationError}>{emailError}</Text>
          ) : null}
        </View>

        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Password</Text>

          <FormInput
            placeholder="Enter password"
            placeholderTextColor="#666"
            autoCapitalize="none"
            secureTextEntry={passwordVisibility}
            textContentType="password"
            rightIcon={rightIcon}
            value={password}
            onChangeText={text => {
              setFormError('');
              setPassword(text);
            }}
            // onChange={handleChange}
            handlePasswordVisibility={handlePasswordVisibility}
            width={1.2}
          />
          {passwordError ? (
            <Text style={styles.validationError}>{passwordError}</Text>
          ) : null}
        </View>
        <View style={styles.already}>
          <TouchableOpacity style={{alignItems: 'flex-start', flex: 1}} />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}
            style={{alignItems: 'flex-end', marginTop: 10}}>
            <Text style={styles.registerText}>Forget Password</Text>
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={{marginTop: 20}}>
          <Text style={styles.error}>{formError}</Text>
          <FormButton
            title={'Login'}
            onPress={handleLogin}
            loading={loginLoader}
            disabled={password?.length < 6 || !emailValidator(email)}
            marginBottom={20}
          />
        </View>

        <View style={[styles.already]}>
          <Text style={[styles.alreadyText]}>Don't have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* TOS */}
        <View style={[styles.section, {marginTop: 20, minHeight: 200}]} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  faceIDContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight / 31,
    marginBottom: windowHeight / 40,
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
    color: COLORS.appTextColor,
    marginRight: 40,
    fontWeight: '500',
  },

  already: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 0,
    width: windowWidth / 1.2,
    // marginLeft: 20,
    justifyContent: 'center',
    // backgroundColor: 'red',

    alignSelf: 'center',
  },
  alreadyText: {
    color: COLORS.appTextColor,
    marginLeft: 25,
    marginRight: 10,
    fontWeight: '500',
    fontSize: 14,
  },
  registerText: {
    color: COLORS.appTextColor,
    fontWeight: '500',
    fontSize: 14,
  },
  bg: {
    backgroundColor: 'red',
  },
  loginSection: {
    flexDirection: 'row',
    // margin: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 20,
  },
  validationError: {
    color: 'red',
    fontWeight: '500',
    marginBottom: 15,
    fontSize: 13,
    // textAlign: 'center',
  },
  registerSection: {
    backgroundColor: 'red',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
