import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../theme/themes';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

const OnboardingScreen = ({navigation}) => {
  const [showRealApp, setShowRealApp] = useState(false);

  const onSkip = () => {
    setShowRealApp(true);
  };

  const slides = [
    {
      key: 's1',
      title: 'Easy Shopping',
      description:
        'Shop for your exceptional thrift wears for your everyday life',
      image: require('../../assets/easyShopping.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 's2',
      title: 'Secure Payment',
      description:
        'During checkout, you’ll provide the details the celeb will need to make the perfect personalized video.',
      image: require('../../assets/paymentCard.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 's3',
      title: 'Quick Delivery',
      description:
        'Celebs have up to 7 days to complete your request. When it’s ready, we’ll send it directly to you.',
      image: require('../../assets/doorDelivery.png'),
      backgroundColor: '#59b2ab',
    },
  ];

  const RenderItem = ({item}) => {
    return (
      <View
        style={[
          styles.renderContainer,
          {backgroundColor: item.backgroundColor},
        ]}>
        <View style={{alignItems: 'center', marginBottom: 0}}>
          <Image style={styles.introImageStyle} source={item.image} />
          <Text style={styles.introTitleStyle}>{item.title}</Text>
        </View>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.onboarderBtn}>
        <Ionicons name="arrow-forward-outline" color="white" size={24} />
      </View>
    );
  };

  const renderPreviousButton = () => {
    return (
      <View style={styles.onboarderBtn}>
        <Ionicons name="arrow-forward-outline" color="white" size={24} />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity
        style={styles.onboarderBtn}
        onPress={() => navigation.navigate('Home')}>
        <Ionicons name="checkmark-outline" color="white" size={24} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        showSkipButton={false}
        onSkip={onSkip}
        renderPrevButton={renderPreviousButton}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
        activeDotStyle={{backgroundColor: COLORS.thriftyColor}}
        dotStyle={{backgroundColor: 'white'}}
      />
    </>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: windowWidth,
    height: windowHeight / 2,
    resizeMode: 'center',
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: windowHeight / 3,
    marginBottom: 15,
  },
  introTitleStyle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 40,
  },
  introTextStyle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
    // marginBottom: 20,
    fontWeight: '700',
  },
  continueButton: {
    // padding: 20,
    // color: COLORS.pinky,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderWidthColor: 'red',
    // backgroundColor: 'red',
    width: windowWidth / 1.7,
    height: windowHeight / 15,
    alignSelf: 'center',
  },
  renderContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingBottom: windowHeight / 2,
    // alignContent: 'center',
    // alignSelf: 'center',
  },
  continueText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  onboarderBtn: {
    // borderWidth: 2,
    // width: windowWidth / 1.8,
    // height: windowHeight / 19,
    // alignSelf: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
    // borderRadius: 6,
    // marginBottom: 50,
    // backgroundColor: COLORS.pinky,

    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
