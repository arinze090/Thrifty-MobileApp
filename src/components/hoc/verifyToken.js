import {connect, useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {VERIFY_TOKEN} from '../../utils/graphql/gql-queries';
import {signOutUser} from '../../redux/features/user/userSlice';

// This function takes a component...
export default function verifyToken(WrappedComponent) {
  return props => {
    const tokenSavedInRedux = useSelector(state => state?.user?.user?.token);
    console.log({tokenSavedInRedux});
    const [verifyTokenGQL, {data, loading, error}] = useLazyQuery(
      VERIFY_TOKEN,
      {
        context: {
          headers: {
            Authorization: tokenSavedInRedux,
          },
        },
      },
    );

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const checkLogin = async () => {
      console.log('before hoc', tokenSavedInRedux);
      if (tokenSavedInRedux) {
        try {
          const token = await verifyTokenGQL();
          console.log('hoc', token);
          if (token?.data?.verifyToken?.code !== 200) {
            dispatch(signOutUser());
            Alert.alert('Session Expired', 'Please login to continue');
            navigation.navigate('Login');
          }
        } catch (error) {
          dispatch(signOut());
          Alert.alert('Session Expired', 'Please login to continue');
          navigation.navigate('Login');
        }
      } else {
        console.log('session error', error);
        dispatch(signOut());
        Alert.alert('Session Expired', 'Please login to continue');
        navigation.navigate('Login');
      }
    };

    useEffect(() => {
      checkLogin();
    }, [props, tokenSavedInRedux]);

    return <WrappedComponent {...props} />;
  };
}
