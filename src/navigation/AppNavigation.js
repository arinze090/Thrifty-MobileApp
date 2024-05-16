import React, {useEffect, useState} from 'react';
import {
  AppState,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {COLORS} from '../theme/themes';
import CustomDrawer from '../components/common/CustomDrawer';
import MainScreen from '../screens/MainScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import {
  GET_BRANDS,
  GET_CATEGORIES,
  GET_ITEM_CONDITIONS,
} from '../utils/graphql/gql-queries';
import {useLazyQuery} from '@apollo/client';
import {
  categoriesFetchLoading,
  getBrands,
  getCategories,
  getItemConditions,
} from '../redux/features/category/categorySlice';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppNavigation = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  // We will load fresh data on this screen
  const [fetchData, {loading: categoryLoading}] = useLazyQuery(GET_CATEGORIES, {
    fetchPolicy: 'network-only',
    // nextFetchPolicy: 'cache-first',
  });

  // function for fetching category data and checking for last time data was fetched
  const loadCategoriesFromServer = async () => {
    console.log('--- Fetching data from graphQL server ---');

    setLoading(true);
    dispatch(categoriesFetchLoading(false));

    fetchData({
      onCompleted: async data => {
        if (data?.getCategories?.length > 0) {
          dispatch(getCategories({categories: data?.getCategories}));
          dispatch(categoriesFetchLoading(false));
        }
        console.log('dataaa', data);
      },
      onError: error => {
        console.log('error', error);
      },
    });
  };

  const [fetchBrands, {loading: brandsLoading}] = useLazyQuery(GET_BRANDS, {
    fetchPolicy: 'network-only',
    // nextFetchPolicy: 'cache-first',
  });

  // function for fetching brands data
  const fetchBrandsFromServer = async () => {
    console.log('--- Fetching brands from graphQL server ---');

    setLoading(true);

    fetchBrands({
      onCompleted: async data => {
        if (data?.getBrands?.length > 0) {
          dispatch(getBrands(data?.getBrands));
        }
        console.log('fetchBrands dataaa', data);
      },
      onError: error => {
        console.log('error', error);
      },
    });
  };

  const [fetchItemConditions, {loading: itemConditions}] = useLazyQuery(
    GET_ITEM_CONDITIONS,
    {
      fetchPolicy: 'network-only',
      // nextFetchPolicy: 'cache-first',
    },
  );

  // function for fetching brands data
  const fetchItemConditionsFromServer = async () => {
    console.log('--- Fetching itemConditions from graphQL server ---');

    setLoading(true);

    fetchItemConditions({
      onCompleted: async data => {
        if (data?.getItemConditions?.length > 0) {
          dispatch(getItemConditions(data?.getItemConditions));
        }
        console.log('fetchItemConditions dataaa', data);
      },
      onError: error => {
        console.log('error', error);
      },
    });
  };

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  const userToken = state?.user?.userToken;
  console.log('userToken', userToken);
  const [loading, setLoading] = useState(false);

  // To show the onboarding screen on just first launch
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      AsyncStorage.getItem('alreadyLaunched').then(value => {
        if (value === null) {
          AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
          console.log('isFirstLaunch');
        } else {
          setIsFirstLaunch(false);
          console.log('notIsFirstLaunch');
        }
      });

      // AppStateIOS.addEventListener('change', state => console.log('AppStateIOS changed to', state));

      AppState.addEventListener('change', state =>
        console.log('AppState changed to', state),
      );
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    loadCategoriesFromServer();
    fetchBrandsFromServer();
    fetchItemConditionsFromServer();
  }, []);

  // Displaying the app component
  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <Drawer.Navigator
        // ref={navigationRef}
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          drawerLabelStyle: {
            marginLeft: -25,
          },
          drawerActiveBackgroundColor: COLORS.black,
          drawerActiveTintColor: 'white',
          drawerInactiveTintColor: COLORS.btnBorderColor,
        }}
        headerMode="none">
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{
            headerShown: false,
            drawerIcon: ({color}) => (
              <Ionicons name="home-outline" color={color} size={22} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  } else if (isFirstLaunch === false) {
    return (
      <Drawer.Navigator
        // ref={navigationRef}
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          drawerLabelStyle: {
            marginLeft: -15,
          },
          drawerActiveBackgroundColor: COLORS.black,
          drawerActiveTintColor: 'white',
          drawerInactiveTintColor: COLORS.btnBorderColor,
        }}
        headerMode="none">
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{
            headerShown: false,
            drawerIcon: ({color}) => (
              <Ionicons name="home-outline" color={color} size={22} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
};

export default AppNavigation;

const styles = StyleSheet.create({});
