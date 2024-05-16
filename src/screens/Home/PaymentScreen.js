import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import Toast from 'react-native-toast-message';
import {useMutation} from '@apollo/client';

import {
  CREATE_ORDER,
  CREATE_SINGLE_ORDER,
} from '../../utils/graphql/gql-queries';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';
import {
  RNToast,
  calculatePercentage,
  setPriceTo2DecimalPlaces,
  timeAgo,
} from '../../Library/Common';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import FormButton from '../../components/form/FormButton';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import FormInput from '../../components/form/FormInput';
import {setUserDeliveryAddress, updateThrifty} from '../../redux/features/user/userSlice';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import verifyToken from '../../components/hoc/verifyToken';

const PaymentScreen = ({navigation, route}) => {
  const item = route.params;
  console.log('orderItem', item);

  const refRBSheet = useRef();
  const webviewRef = useRef();
  const local = useRef();
  // Paystack Integration
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const loggedUser = state?.user?.user?.user;
  console.log('loggedUser', loggedUser);
  console.log('state', state);

  const reduxDeliveryAddress = state?.user?.userDeliveryAddress;
  console.log('reduxDeliveryAddress', reduxDeliveryAddress);

  const paystackKey = process.env.PAYSTACK_TEST_PUBLIC_KEY;
  console.log('paystackKey', paystackKey);

  const [loading, setLoading] = useState(false);

  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [formError, setFormError] = useState('');

  const [totalFee, setTotalFee] = useState();

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

  const paymentAmount = item?.price;
  const d = new Date();
  const time = d.getTime();
  const paymentReference =
    state?.user?.user?.user?.id + '_' + paymentAmount + '_' + time;
  const platformFee = calculatePercentage(paymentAmount, 10);
  const overallFee = paymentAmount + platformFee;

  // Apollo Mutation
  const [
    buyItemsMutation,
    {data: buyItemsMutationData, loading: buyItemsMutationLoading, error},
  ] = useMutation(CREATE_SINGLE_ORDER, {
    context: {
      headers: {
        Authorization: state?.user?.user?.token,
      },
    },
  });

  // This function sends the given data to the Backend
  const preparePaymentData = (
    payment_method,
    payment_ref,
    payment_data,
    is_paid = 0,
  ) => {
    const data = {
      delivery_details: {
        additional_phone_number: reduxDeliveryAddress?.deliveryPhoneNumber,
        apt_or_suite_number: '',
        city: reduxDeliveryAddress?.city,
        special_instructions: '',
        state: reduxDeliveryAddress?.deliveryState,
        street_address: reduxDeliveryAddress?.address,
        zip_code: '',
      },
      delivery_fee: 4000,
      item: item?.id,
      qty: 1,
      price_paid: paymentAmount,

      payment_method,
      payment_ref: payment_ref ? payment_ref : paymentReference,
      payment_data: JSON.stringify(payment_data),
    };

    console.log('paymentdata', data);

    try {
      buyItemsMutation({
        variables: {inputData: data},
        onCompleted: data => {
          console.log('api success', data);

          if (data?.createSingleOrder?.success) {
            if (data?.createSingleOrder?.order) {
              dispatch(updateThrifty(data?.createSingleOrder?.order));
            }
            // Alert the user that the transaction was successful
            Alert.alert(
              'Order Placed!',
              'Your order was placed successfully 😇. Thank you!',
            );
            RNToast(Toast, 'Hurray! Your order was placed successfully! 😇');
            navigation.navigate('HomeOrders');
          } else {
            Alert.alert(
              'Order Failed',
              'Something went wrong, we could not place your order at the moment, please try again. If you get this message again, please logout, login and retry. Thank you',
            );
          }
        },

        onError: error => {
          console.log('api eorrr', error);
          Alert.alert(
            'Order Failed',
            'Something went wrong, we could not place your order at the moment, please try again. If you get this message again, please logout, login and retry. Thank you',
          );
        },
      });
    } catch (error) {
      setFormError('An error occured. Please try again');
    }
  };

  // PostPayment for PayStack Integration
  const postPayStackPayment = paymentData => {
    const payStackPaymentReference =
      paymentData?.data?.transactionRef?.reference;
    const transactionNo = paymentData?.data?.transactionRef?.transaction;
    const paymentReferenceData = JSON.stringify(paymentData);
    preparePaymentData(
      'Paystack',
      payStackPaymentReference,
      paymentReferenceData,
      1,
    );
  };

  const saveDeliveryAddressToRedux = () => {
    console.log('presssed');
    if (!fullName && !city && !deliveryState && !deliveryAddress) {
      setCityError('Please add this field');
      setDeliveryStateError('Add delivery state');
      setFullNameError('Provide your full name');
      setAddressError('Please provide your address');
    } else if (!city) {
      setCityError('Please add this field');
    } else if (!deliveryState) {
      setDeliveryStateError('Add delivery state');
    } else if (!deliveryAddress) {
      setAddressError('Please provide your address');
    } else {
      dispatch(setUserDeliveryAddress(saveReduxAddress));
      refRBSheet.current.close();
    }
  };

  const DisplayAddressForm = () => {
    return (
      <KeyboardAvoidingView>
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
              width={1.2}
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
              }}
              width={1.2}
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
              width={1.2}
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
              width={1.2}
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
              width={1.2}
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
              width={1.2}
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
      </KeyboardAvoidingView>
    );
  };

  const startPayStackPayment = () => {
    console.log('clicked');
    if (
      !reduxDeliveryAddress?.address ||
      !reduxDeliveryAddress?.deliveryPhoneNumber ||
      !reduxDeliveryAddress?.city ||
      !reduxDeliveryAddress?.deliveryState
    ) {
      Alert.alert(
        'Please provide your full delivery details before initiating payment',
      );
      RNToast(Toast, 'Please provide your delivery details');
    } else {
      paystackWebViewRef.current.startTransaction();
    }
  };

  return (
    <SafeAreaViewComponent>
      <ScrollView contentContainerStyle={{padding: 20}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.borderBottomColor,
          }}>
          <Image
            source={{uri: item?.cover_image}}
            style={styles.productImage}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={styles.priceBreakdown}>Order</Text>
          <Text style={{color: 'black'}}>
            {setPriceTo2DecimalPlaces(paymentAmount)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={styles.priceBreakdown}>Buyer Protection Fee</Text>
          <Text style={{color: 'black'}}>
            {setPriceTo2DecimalPlaces(platformFee)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={[styles.priceBreakdown, {color: 'black'}]}>
            Total To Pay
          </Text>
          <Text style={{color: 'black'}}>
            {setPriceTo2DecimalPlaces(overallFee)}
          </Text>
        </View>

        <View style={styles.breaker} />

        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            borderBottomColor: COLORS.borderBottomColor,
            borderBottomWidth: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black'}}>Address</Text>
            <Ionicons
              name={reduxDeliveryAddress ? 'pencil-outline' : 'add-outline'}
              size={20}
              color={COLORS.appTextColor}
              onPress={() => {
                // refRBSheet.current.open();
                navigation.navigate('AddressFormScreen');
              }}
            />
          </View>
          {reduxDeliveryAddress && (
            <View style={{marginTop: 10, marginBottom: 20}}>
              <Text style={{color: 'black'}}>{reduxDeliveryAddress?.name}</Text>
              <Text style={{color: 'black'}}>
                {reduxDeliveryAddress?.address}, {reduxDeliveryAddress?.city}{' '}
                {'\n'}
                {reduxDeliveryAddress?.deliveryState}
              </Text>

              <Text style={{color: 'black'}}>
                {reduxDeliveryAddress?.deliveryPhoneNumber}
              </Text>
            </View>
          )}
        </View>

        <View>
          <Text
            style={[
              styles.summaryA,
              {fontSize: 13, color: COLORS.descriptionText},
            ]}>
            {item?.description}
          </Text>

          {item?.brand && (
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Brand</Text>
              <Text style={styles.summaryA}>{item?.brand?.name}</Text>
            </View>
          )}
          {item?.color && (
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Color</Text>
              <Text style={styles.summaryA}>{item?.color}</Text>
            </View>
          )}
          {item?.brand && (
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Condition</Text>
              <Text style={styles.summaryA}>{item?.condition?.name}</Text>
            </View>
          )}
          {item?.size && (
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Size</Text>
              <Text style={styles.summaryA}>{item?.size}</Text>
            </View>
          )}
          {item?.quantity_in_stock && (
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Quantity in stock</Text>
              <Text style={styles.summaryA}>{item?.quantity_in_stock}</Text>
            </View>
          )}
          {item?.createdAt && (
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Uploaded</Text>
              <Text style={styles.summaryA}>{timeAgo(item?.createdAt)}</Text>
            </View>
          )}
        </View>

        <BottomSheet
          bottomSheetRef={refRBSheet}
          bottomsheetTitle={'Add Address'}
          height={1.2}>
          <DisplayAddressForm />
        </BottomSheet>

        <View style={{marginTop: 20}}>
          <FormButton
            disabled={loading || buyItemsMutationLoading}
            title={buyItemsMutationLoading ? 'Loading ...' : 'Pay Now'}
            onPress={startPayStackPayment}
          />
        </View>

        <Paystack
          paystackKey={'pk_test_b2f376cc25aa858bcff588c2ac5ebe9e80f4f7fe'}
          paystackSecretKey={'sk_test_a1e9bbf95dc01d06a9b44df348e7fac4d3e02620'}
          amount={overallFee}
          currency="NGN"
          billingEmail={loggedUser?.email}
          activityIndicatorColor="green"
          onCancel={ref => {
            // handle response here
            console.log(ref);
          }}
          onSuccess={res => {
            console.log('paystack response ', res);
            postPayStackPayment(res);
            // cancelOccasion();
          }}
          autoStart={false}
          ref={paystackWebViewRef}
          postPayAction={preparePaymentData}
        />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default verifyToken(PaymentScreen);

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
  validationError: {
    color: 'red',
    fontWeight: '500',
    marginBottom: 15,
    fontSize: 13,
    // textAlign: 'center',
  },
});
