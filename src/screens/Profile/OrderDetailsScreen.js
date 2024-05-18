import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import StepIndicator from 'react-native-step-indicator';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

import OrderDetailsCard from '../../components/cards/OrderDetailsCard';
import {
  RNToast,
  convertTimestampToCustomFormat,
  setPriceTo2DecimalPlaces,
} from '../../Library/Common';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import dummyData from '../../data/dummyData';
import {
  checkIfItemDeliveredAndSentOutIsNotTrue,
  trackingPrecedence,
} from '../../Library/TrackingPrecedence';
import FormButton from '../../components/form/FormButton';
import {UPDATE_TRACKING_PROGRESS} from '../../utils/graphql/gql-queries';
import {useMutation} from '@apollo/client';
import HeaderTitle from '../../components/common/HeaderTitle';

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: COLORS.thriftyColor,
  separatorFinishedColor: COLORS.thriftyColor,
  separatorUnFinishedColor: '#333',
  stepIndicatorFinishedColor: COLORS.thriftyColor,
  stepIndicatorUnFinishedColor: '#333',
  stepIndicatorCurrentColor: '#000',
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#fff',
  stepIndicatorLabelFinishedColor: '#fff',
  stepIndicatorLabelUnFinishedColor: '#fff',
  labelColor: COLORS.thriftyColor,
  labelSize: 15,
  currentStepLabelColor: COLORS.thriftyColor,
  labelAlign: 'flex-start',
};

const OrderDetailsScreen = ({route, navigation}) => {
  const item = route.params;
  console.log('item', item);

  const allSetup = dummyData?.data;

  const getTrackingPrecedence = trackingPrecedence(item);
  console.log('getTrackingPrecedence', getTrackingPrecedence);

  const checkDeliveryStatus = checkIfItemDeliveredAndSentOutIsNotTrue(item);
  console.log('checkDeliveryStatus', checkDeliveryStatus);

  const [currentPosition, setCurrentPosition] = useState(getTrackingPrecedence);
  const [count, setCount] = useState(allSetup?.length);
  console.log('currentPosition', currentPosition);

  const handleNext = () => {
    if (currentPosition >= allSetup.length) {
      // navigate to Dashboard
      navigation.navigate('HomeStack', {screen: 'HomeScreen'});
      navigation.navigate('Dashboard', {screen: 'Dashboards'});
      console.log('steps complete');
      // Alert him 'Congrats you can now start selling on Shoutty'
      Alert.alert(
        'Profile Setup',
        'Yayyyy, Your profile is setup successfully. You can now start selling on Shoutty',
      );

      // CelebProfileProgress();
      // Toast a message to the celeb
      RNToast(Toast, 'Yayyyy, You can now start selling on Shoutty 😇');
    } else {
      setCurrentPosition(currentPosition + 1);
    }
  };

  const validateTracking = () => {
    Alert.alert(
      'Update Tracking Progress',
      'Are you sure you want to update the progress of your order? If you proceed with this action, it means you have received your order',
      [
        {
          text: 'Not yet',
          //onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes, Update it',
          onPress: () => {
            updateTrackingProgress();
          },
        },
      ],
    );
  };

  const [
    updateTrackingMutation,
    {
      data: updateTrackingMutationData,
      loading: updateTrackingMutationLoader,
      error: updateTrackingMutationError,
    },
  ] = useMutation(UPDATE_TRACKING_PROGRESS);

  const updateTrackingProgress = () => {
    const updateTrackingData = {
      orderId: item?.id,
      trackingLevel: 4,
    };

    try {
      console.log('updateTrackingData', updateTrackingData);
      updateTrackingMutation({
        variables: updateTrackingData,
        onCompleted: async data => {
          console.log('updateTracking mutation', data);

          if (data?.updateTrackingProgress?.success === true) {
            navigation?.goBack();
            // Toast a message to the user if the code == 200 or successful
            RNToast(
              Toast,
              'Awesome! Your item has been delivered and received',
            );
            Alert.alert(
              'Awesomee !!!',
              'Your tracking has been updated successfully, your item has been delivered to your doorstep and received it gratitude',
            );
          } else if (data?.updateTrackingProgress?.success === false) {
            // Toast a message to the user if the code == 200 or successful
            RNToast(Toast, 'Something went wrong, please try again.');
            Alert.alert(
              'Request Failed',
              data?.updateTrackingProgress?.message,
            );
          }
        },
        onError: error => {
          console.log('error', error);
          Alert.alert(
            'Request Failed',
            'Something went wrong, We couldnt process your update at the moment, Please try again. Thank you',
          );
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation?.goBack();
        }}
        headerTitle={'Order Details'}
        rightIcon={'menu-outline'}
        onRightIconPress={() => {
          navigation.openDrawer();
        }}
      />
      <ScrollView style={styles.container}>
        {item?.items?.map((cur, i) => (
          <OrderDetailsCard props={cur} />
        ))}

        {/* Payment Section */}
        <View style={{marginBottom: 20}}>
          <Text style={styles.summary}>Payment Details</Text>

          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Buyer Protection Fee</Text>
            <Text style={styles.summaryA}>
              {setPriceTo2DecimalPlaces(item?.price_breakdown?.platform_fee)}
            </Text>
          </View>
          <View style={styles.breaker} />
          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Delivery Fee</Text>
            <Text style={styles.summaryA}>
              {setPriceTo2DecimalPlaces(item?.price_breakdown?.delivery_fee)}
            </Text>
          </View>
          <View style={styles.breaker} />
          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Items Price</Text>
            <Text style={styles.summaryA}>
              {setPriceTo2DecimalPlaces(
                item?.price_breakdown?.total_items_price,
              )}
            </Text>
          </View>
          <View style={styles.breaker} />
          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Total</Text>
            <Text style={styles.summaryA}>
              {setPriceTo2DecimalPlaces(
                item?.price_breakdown?.total_accumulated_price,
              )}
            </Text>
          </View>

          <View style={styles.breaker} />
          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Payment</Text>
            <Text style={styles.summaryA}>
              {convertTimestampToCustomFormat(parseInt(item?.createdAt))}
            </Text>
          </View>
          <View style={styles.breaker} />
        </View>

        <View style={styles.containerInd}>
          <View style={styles.stepIndicator}>
            <StepIndicator
              customStyles={stepIndicatorStyles}
              stepCount={count}
              direction="horizontal"
              // currentPosition is based on reduxProfileProgress
              currentPosition={currentPosition}
              onPress={position => {
                Alert.alert('Pressed');

                console.log('pox', position, currentPosition);
                if (currentPosition > position) {
                  navigation.navigate(allSetup[position].navigation);
                }
              }}
              labels={dummyData?.data?.map(item => item?.title)}
              renderLabel={lbl => (
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'left',
                    marginTop: 8,
                    marginLeft: 10,
                    fontWeight: lbl?.stepStatus == 'finished' ? 'bold' : '700',
                    color:
                      lbl?.stepStatus == 'finished'
                        ? COLORS.thriftyColor
                        : '#666',
                  }}>
                  {lbl.label}
                </Text>
              )}
            />
          </View>
        </View>

        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicons name="home-outline" color={'black'} size={30} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.summary}>Delivery Details</Text>
            <Text style={styles.deliverySection}>
              {item.delivery_details.apt_or_suite_number}{' '}
              {item.delivery_details.street_address}
              {','} {item.delivery_details.city}
              {', '}
              {item.delivery_details.state}
            </Text>
          </View>
        </View>

        <View>
          {!checkDeliveryStatus && (
            <FormButton
              title="Update Tracking"
              onPress={() => {
                validateTracking();
              }}
              disabled={updateTrackingMutationLoader}
            />
          )}
        </View>
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  br: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  Q: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: windowHeight / 15,
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  breaker: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  summary: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 5,
    marginBottom: 5,
    color: COLORS.appTextColor,
  },
  summaryQ: {
    color: COLORS.appTextColor,
    // fontWeight: '500',
    fontSize: 14,
    // backgroundColor: 'red',
    // width: windowWidth / 1.3,
  },
  summaryQ1: {
    color: COLORS.appTextColor,
    // fontWeight: '500',
    fontSize: 14,
    // backgroundColor: 'red',
    width: windowWidth / 1.3,
  },
  summaryA: {
    color: COLORS.appTextColor,
    // fontWeight: '500',
    fontSize: 14,
  },
  summaryQ2: {
    color: COLORS.appTextColor,
    fontWeight: '700',
    fontSize: 14,
  },
  deliverySection: {
    fontSize: 14,
  },
  containerInd: {
    // alignItems: 'center',
    borderTopColor: '#212121',
    marginTop: 20,
    // backgroundColor: 'red',
  },
  stepIndicator: {
    marginVertical: 10,
    // paddingHorizontal: 10,
    height: windowHeight / 10,
    // width: windowWidth / 1.03,
  },
});
