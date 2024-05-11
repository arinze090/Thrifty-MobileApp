import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {Alert} from 'react-native';

// This function takes a component...
export default function verifyToken(WrappedComponent) {
  return props => {
    const tokenSavedInRedux = useSelector(state => state?.user?.user?.token);
    console.log('tokenSavedInRedux', tokenSavedInRedux);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const checkLogin = token => {
      setTimeout(() => {
        if (!token) {
          Toast.show({
            type: 'thriftyToast',
            text2: 'Session Expired. Please login to continue',
          });
          Alert.alert('Session Expired', 'Please login to enjoy our services');
          navigation.navigate('Login');
        }
      }, 500);
    };

    useEffect(() => {
      const focusUnSubscribe = navigation.addListener('focus', () =>
        checkLogin(tokenSavedInRedux),
      );
      return () => {
        try {
          focusUnSubscribe();
        } catch (e) {}
      };
    }, [tokenSavedInRedux]);

    return <WrappedComponent {...props} />;
  };
}
