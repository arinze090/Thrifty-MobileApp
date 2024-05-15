import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import PassMeter from 'react-native-passmeter';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation} from '@apollo/client';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import FormInput from '../../components/form/FormInput';
import {COLORS} from '../../theme/themes';
import {SIGNUP} from '../../utils/graphql/gql-queries';
import FormButton from '../../components/form/FormButton';
import {getUser, registerUser} from '../../redux/features/user/userSlice';
import {
  nameValidator,
  passwordValidator,
  phoneValidator,
  emailValidator,
  checkPassword,
} from '../../Library/Validation';

const RegisterScreen = ({navigation, props, route}) => {
  const item = route.params;
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  console.log('state', state);

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

  // Register Mutation
  const [signupMutation, {data: signupData, loading, error: signupError}] =
    useMutation(SIGNUP);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [emailError, setEmailError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [formError, setFormError] = useState('');
  const [value, setValue] = useState('');
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('AO');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const validatedPassword = checkPassword(password);

  // This function handles the submission
  const handleSignup = () => {
    const registerData = {
      email: email,
      firstname: firstname,
      password: password,
      lastname: lastname,
      mobile: formattedValue,
      gender: 1,
      // country: country,
    };

    if (
      !nameValidator(firstname) &&
      !nameValidator(lastname) &&
      !emailValidator(email) &&
      !validatedPassword.isValid &&
      !phoneValidator(formattedValue)
    ) {
      setFirstnameError('Please enter a valid name');
      setLastnameError('Please enter a valid name');
      setPhoneError('Please enter a valid phone number');
      setEmailError('Please enter a valid email');
      setPasswordError(validatedPassword.cause);
    } else if (!nameValidator(firstname)) {
      setFirstnameError('Please enter a valid name');
    } else if (!nameValidator(lastname)) {
      setLastnameError('Please enter a valid name');
    } else if (!phoneValidator(formattedValue)) {
      setPhoneError('Please enter a valid phone number');
    } else if (!emailValidator(email)) {
      setEmailError('Please enter a valid email');
    } else if (!validatedPassword.isValid) {
      setPasswordError(validatedPassword.cause);
    } else {
      console.log('testingg');
      try {
        console.log('registerData', registerData);
        signupMutation({
          variables: {inputData: registerData},
          onCompleted: res => {
            console.log('res', res);
            if (res?.registerUser?.success) {
              // dispatch to register redux
              dispatch(registerUser(res?.registerUser));
              navigation.navigate('UserVerification', email);
            } else if (res?.registerUser?.code === 11000) {
              setFormError('Your email is already registered. please login');
            } else if (res?.registerUser?.code === 409) {
              setFormError(res?.registerUser?.message);
              // setFormError('Something went wrong, please try again');
            }
          },
          onError: err => {
            console.log('reg error', err);
            setFormError('Something went wrong, please try again');
          },
        });
      } catch (error) {
        setFormError('An error occured. Please try again');
      }
    }
  };

  // useEffect(() => {
  //   if (signupData?.registerUser?.code === 200) {
  //     console.log('signupdata', signupData);

  //     // props.getUser(signupData?.registerUser);
  //     // dispatch(registerUser(signupData?.registerUser));

  //     // dispatch the customerId to redux cos it's going to be used in the verification screen and change password
  //     dispatch(getUser(signupData?.registerUser));
  //     navigation.navigate('UserVerification', email);

  //     // if (ReduxDestination) {
  //     // 	navigation.navigate(ReduxDestination);
  //     // }
  //   } else if (signupData?.registerUser?.code === 11000) {
  //     setFormError('Your email is already registered. please login');
  //   } else if (signupData?.registerUser?.code === 400) {
  //     setFormError(signupData?.registerUser?.message);
  //     setFormError('Something went wrong, please try again');

  //     // navigation.navigate('ProfileStack', { screen: 'Profile' });
  //   } else if (signupData?.registerUser?.code === 500) {
  //     Alert.alert('Something went wrong, please try again');
  //   }
  // }, [signupData?.registerUser]);

  const deviceWindow = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{paddingTop: 40, marginLeft: 20}}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="whitesmoke" />
      </TouchableOpacity>
      <Image
        style={styles.logoImage}
        source={require('../../assets/thriftyLogoo.png')}
      />

      {/* Authentications */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView>
          <View style={styles.auth}>
            <Text style={styles.inputTitle}>First Name *</Text>
            <FormInput
              inputStyle={{
                fontSize: 16,
              }}
              placeholder="Enter First Name"
              placeholderTextColor="#666"
              autoCapitalize="none"
              keyboardType="default"
              textContentType="none"
              required
              value={firstname}
              onChangeText={text => {
                setFirstname(text);
                setFormError('');
                if (!nameValidator(text)) {
                  setFirstnameError('Please enter a valid name');
                } else {
                  setFirstnameError('');
                }
              }}
            />
            {firstnameError ? (
              <Text style={styles.validationError}>{firstnameError}</Text>
            ) : null}
          </View>
          <View style={styles.auth}>
            <Text style={styles.inputTitle}>Last Name *</Text>
            <FormInput
              inputStyle={{
                fontSize: 16,
              }}
              placeholderTextColor="#666"
              placeholder="Enter Last Name"
              autoCapitalize="none"
              keyboardType="default"
              textContentType="none"
              value={lastname}
              onChangeText={text => {
                setLastname(text);
                setFormError('');
                if (!nameValidator(text)) {
                  setLastnameError('Please enter a valid name');
                } else {
                  setLastnameError('');
                }
              }}
            />
            {lastnameError ? (
              <Text style={styles.validationError}>{lastnameError}</Text>
            ) : null}
          </View>
          <View style={styles.auth}>
            <Text style={styles.inputTitle}>Phone Number *</Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode={phoneCountry}
              layout="first"
              placeholderTextColor={'black'}
              onChangeText={txt => {
                setValue(txt);
              }}
              onChangeCountry={country => {
                setPhoneCountry(country?.cca2);
              }}
              onChangeFormattedText={text => {
                setFormattedValue(text);
                setPhoneError('');
                if (!phoneValidator(text)) {
                  setPhoneError('Please enter a valid phone number');
                } else {
                  setPhoneError('');
                }
              }}
              withDarkTheme
              withShadow
              // autoFocus
              containerStyle={{
                backgroundColor: COLORS.appBackground,
                borderRadius: 5,
                width: windowWidth / 1.2,
                borderWidth: 1,
                borderColor: '#333',
              }}
              textContainerStyle={{
                backgroundColor: COLORS.appBackground,
                height: windowHeight / 17,
                color: 'black',
              }}
              codeTextStyle={{
                height: windowHeight / 34,
                marginTop: 5,
                color: 'black',
              }}
              textInputStyle={{color: COLORS.appBackground}}
              textInputProps={{
                placeholderTextColor: 'black',
                keyboardType: 'numeric',
                color: 'black',
                height: 44,
              }}
            />
            {phoneError ? (
              <Text style={styles.validationError}>{phoneError}</Text>
            ) : null}
          </View>
          <View style={styles.auth}>
            <Text style={styles.inputTitle}>Email Address *</Text>
            <FormInput
              inputStyle={{
                fontSize: 16,
              }}
              placeholderTextColor="#666"
              placeholder="Enter Email Address"
              autoCapitalize="none"
              autoCorrect="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              // onChange={e => setEmail(e.target.value)}
              onChangeText={text => {
                setEmail(text);
                setFormError('');
                if (!emailValidator(text)) {
                  setEmailError('Please enter a valid email');
                } else {
                  setEmailError('');
                }
              }}
            />
            {emailError ? (
              <Text style={styles.validationError}>{emailError}</Text>
            ) : null}
          </View>
          <View style={styles.auth}>
            <Text style={styles.inputTitle}>Password *</Text>

            <FormInput
              inputStyle={{
                fontSize: 16,
              }}
              placeholderTextColor="#666"
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={passwordVisibility}
              textContentType="password"
              rightIcon={rightIcon}
              value={password}
              onChangeText={value => {
                setPassword(value);
                setFormError('');
                setPasswordError('');
                // if (!checkPassword(value).isValid) {
                // 	setPasswordError(validatedPassword.cause);
                // } else {
                // 	setPasswordError('');
                // }
              }}
              handlePasswordVisibility={handlePasswordVisibility}
            />

            <View
              style={{
                marginTop: -2,
                width: deviceWindow.width * 0.83,
                overflow: 'hidden',
              }}>
              {password !== '' ? (
                <PassMeter
                  showLabels
                  password={password}
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
                color: COLORS.appTextColor,
                fontSize: 12,
                marginTop: password?.length ? -6 : 5,
              }}>
              Use at least 8 characters including 1 uppercase letter, a number
              and a special character like !@#$%%^&*
            </Text>
          </View>
          {/* Buttons */}
          <View>
            <View>
              <Text
                style={{
                  color: COLORS.appTextColor,
                  margin: 30,
                  marginBottom: 0,
                }}>
                By signing up, you agree to Thrifty's{' '}
                <Text
                  onPress={() => navigation.navigate('Terms & Condition')}
                  style={{color: 'red', marginLeft: 20}}>
                  Terms of Service{' '}
                </Text>
                and{' '}
                <Text
                  onPress={() => navigation.navigate('Privacy Policy')}
                  style={{color: 'red', marginLeft: 20}}>
                  Privacy Policy.
                </Text>
              </Text>
            </View>
            <Text style={styles.error}>{formError}</Text>
            <FormButton
              title={
                loading ? (
                  <ActivityIndicator
                    size={'small'}
                    color={COLORS.appTextColor}
                  />
                ) : (
                  'Create Account'
                )
              }
              onPress={handleSignup}
              loading={loading}
              disabled={loading}
            />
          </View>

          <View style={styles.already}>
            <Text style={styles.alreadyText}>Already have an account ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registerText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.section, {marginTop: 20, minHeight: 200}]} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  logo: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'red',
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
    color: COLORS.pinky,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    margin: 20,
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
    width: windowWidth / 1.8,
    height: windowHeight / 12,
    resizeMode: 'cover',
    // backgroundColor: 'red',
    // marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: windowHeight / 12,
  },
  auth: {
    width: windowWidth / 1.2,
    alignSelf: 'center',
    marginTop: 20,
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
    // marginTop: 20,
    width: windowWidth / 4.5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  already: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  alreadyText: {
    color: COLORS.appTextColor,
    // marginLeft: 25,
    marginRight: 10,
    fontWeight: '500',
    fontSize: 14,
  },
  registerText: {
    color: COLORS.pinky,
    fontWeight: '700',
    fontSize: 14,
  },
  validationError: {
    color: 'red',
    fontWeight: '500',
    marginBottom: 15,
    fontSize: 13,
    // textAlign: 'center',
  },
});
