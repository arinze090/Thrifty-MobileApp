import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';

import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import FormInput from '../../components/form/FormInput';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import FormButton from '../../components/form/FormButton';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';
import {setUserDeliveryAddress} from '../../redux/features/user/userSlice';
import {phoneValidator} from '../../Library/Validation';
import HeaderTitle from '../../components/common/HeaderTitle';

const AddressFormScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const phoneInput = useRef(null);

  const state = useSelector(state => state);
  const loggedUser = state?.user?.user?.user;
  console.log('loggedUser', loggedUser);
  console.log('state', state);

  const reduxDeliveryAddress = state?.user?.userDeliveryAddress;
  console.log('reduxDeliveryAddress', reduxDeliveryAddress);

  const [fullName, setFullName] = useState(
    reduxDeliveryAddress?.name ? reduxDeliveryAddress?.name : '',
  );
  const [deliveryPhoneNumber, setDeliveryPhoneNumber] = useState(
    reduxDeliveryAddress?.deliveryPhoneNumber
      ? reduxDeliveryAddress?.deliveryPhoneNumber
      : '',
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    reduxDeliveryAddress?.address ? reduxDeliveryAddress?.address : '',
  );
  const [postCode, setPostCode] = useState('');
  const [city, setCity] = useState(
    reduxDeliveryAddress?.city ? reduxDeliveryAddress?.city : '',
  );
  const [deliveryState, setDeliveryState] = useState(
    reduxDeliveryAddress?.deliveryState
      ? reduxDeliveryAddress?.deliveryState
      : '',
  );

  // Error states
  const [formError, setFormError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [deliveryPhoneNumberError, setDeliveryPhoneNumberError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [postCodeError, setPostCodeError] = useState('');
  const [cityError, setCityError] = useState('');
  const [deliveryStateError, setDeliveryStateError] = useState('');

  const saveReduxAddress = {
    name: fullName,
    address: deliveryAddress,
    postalCode: postCode,
    city: city,
    deliveryPhoneNumber: deliveryPhoneNumber,
    deliveryState: deliveryState,
  };

  const saveDeliveryAddressToRedux = () => {
    console.log('presssed');
    if (
      !fullName &&
      !city &&
      !deliveryState &&
      !deliveryAddress &&
      !deliveryPhoneNumber
    ) {
      setCityError('Please add this field');
      setDeliveryStateError('Add delivery state');
      setFullNameError('Provide your full name');
      setAddressError('Please provide your address');
      setDeliveryPhoneNumberError('Please enter a valid phone number');
    } else if (!deliveryPhoneNumber) {
      setDeliveryPhoneNumberError('Please enter a valid phone number');
    } else if (!city) {
      setCityError('Please add this field');
    } else if (!deliveryState) {
      setDeliveryStateError('Add delivery state');
    } else if (!deliveryAddress) {
      setAddressError('Please provide your address');
    } else {
      dispatch(setUserDeliveryAddress(saveReduxAddress));
      navigation.goBack();
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Add Delivery Address'}
        rightIcon={'menu-outline'}
        onRightIconPress={() => {
          navigation.openDrawer();
        }}
      />
      <ScrollView>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Full Name</Text>
          <FormInput
            placeholder="Enter Full Name"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            value={fullName}
            onChangeText={text => {
              setFullName(text);
              setFormError('');
              setFullNameError('');
            }}
            width={1.1}
          />
          {fullNameError ? (
            <Text style={styles.validationError}>{fullNameError}</Text>
          ) : null}
        </View>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Phone Number</Text>
          <FormInput
            placeholder="Enter Phone number"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="number-pad"
            value={deliveryPhoneNumber}
            onChangeText={text => {
              setDeliveryPhoneNumber(text);
              setFormError('');

              if (!phoneValidator(text)) {
                setDeliveryPhoneNumberError(
                  'Please enter a valid phone number',
                );
              } else {
                setDeliveryPhoneNumberError('');
              }
            }}
            width={1.1}
          />
          {deliveryPhoneNumberError ? (
            <Text style={styles.validationError}>
              {deliveryPhoneNumberError}
            </Text>
          ) : null}
        </View>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Address</Text>
          <FormInput
            placeholder="Enter address"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            value={deliveryAddress}
            onChangeText={text => {
              setDeliveryAddress(text);
              setFormError('');
              setAddressError('');
            }}
            width={1.1}
            multiline={true}
            height={10}
            maxLength={300}
            autoCorrect={false}
            autoComplete={false}
          />
          {addressError ? (
            <Text style={styles.validationError}>{addressError}</Text>
          ) : null}
        </View>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Postal Code</Text>
          <FormInput
            placeholder="Enter Postal Code"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            value={postCode}
            onChangeText={text => {
              setPostCode(text);
              setFormError('');
            }}
            width={1.1}
          />
          {postCodeError ? (
            <Text style={styles.validationError}>{postCodeError}</Text>
          ) : null}
        </View>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>City</Text>
          <FormInput
            placeholder="Enter City"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            value={city}
            onChangeText={text => {
              setCity(text);
              setFormError('');
              setCityError('');
            }}
            width={1.1}
          />
          {cityError ? (
            <Text style={styles.validationError}>{cityError}</Text>
          ) : null}
        </View>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>State</Text>
          <FormInput
            placeholder="Enter State"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            value={deliveryState}
            onChangeText={text => {
              setDeliveryState(text);
              setFormError('');
              setDeliveryStateError('');
            }}
            width={1.1}
          />
          {deliveryStateError ? (
            <Text style={styles.validationError}>{deliveryStateError}</Text>
          ) : null}
        </View>
        <View style={{marginTop: 20}}>
          <FormButton
            title={'Save Address'}
            onPress={saveDeliveryAddressToRedux}
          />
        </View>
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default AddressFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  Q: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: windowHeight / 15,
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
    borderBottomColor: COLORS.borderBottomColor,
    borderBottomWidth: 1,
  },
  summaryQ: {
    color: COLORS.appTextColor,
    // fontWeight: '500',
    fontSize: 16,
    // backgroundColor: 'red',
    // width: windowWidth / 1.3,
    // marginBottom: 10,
  },
  summaryA: {
    color: COLORS.appTextColor,
    // fontWeight: '500',
    fontSize: 14,
  },
  breaker: {
    borderBottomColor: COLORS.borderBottomColor,
    borderBottomWidth: 1,
  },
  paystackBtn: {
    backgroundColor: COLORS.pinky,
    width: windowWidth / 1.2,
    height: windowHeight / 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 20,
  },
  flwBtn: {
    marginBottom: 20,
    width: windowWidth / 1.2,
  },
  paystackBtnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  productImage: {
    width: windowWidth / 2,
    height: windowHeight / 5,
    marginBottom: 10,
  },
  priceBreakdown: {
    color: COLORS.descriptionText,
  },
  auth: {
    width: windowWidth / 1.1,
    alignSelf: 'center',
    marginTop: 20,
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 15,
    color: COLORS.appTextColor,
    fontWeight: '700',
  },
  validationError: {
    color: 'red',
    fontWeight: '500',
    marginBottom: 15,
    fontSize: 13,
    // textAlign: 'center',
  },
});
