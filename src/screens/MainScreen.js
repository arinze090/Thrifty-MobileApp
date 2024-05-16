import React from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useSelector} from 'react-redux';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';

import {COLORS} from '../theme/themes';
import HomeScreen from './Home/HomeScreen';
import LoginScreen from './Auth/LoginScreen';
import RegisterScreen from './Auth/RegisterScreen';
import OnboardingScreen from './Auth/OnboardingScreen';
import UserVerification from './Auth/UserVerification';
import ForgetPassword from './Auth/ForgetPassword';
import ChangePassword from './Auth/ChangePassword';
import SearchScreen from './Home/SearchScreen';
import ProfileScreen from './Profile/ProfileScreen';
import AboutScreen from './Profile/AboutScreen';
import DetailsScreen from './Home/ProductDetails';
import ResetPasswordVerification from './Auth/ResetPasswordVerification';
import AddItem from './Seller/AddItem';
import FavouriteItemsScreen from './Profile/FavouriteItemsScreen';
import OrdersScreen from './Profile/OrdersScreen';
import OrderDetailsScreen from './Profile/OrderDetailsScreen';
import ChatScreen from './Home/ChatScreen';
import AccountHistory from './Profile/AccountHistory';
import PaymentScreen from './Home/PaymentScreen';
import SellerOrdersScreen from './Profile/SellerOrdersScreen';
import EditProfile from './Profile/EditProfile';
import AdminDashboard from './Admin/AdminDashboard';
import CreateBrandsScreen from './Admin/CreateBrandsScreen';
import CreateItemTypeScreen from './Admin/CreateItemTypeScreen';
import AddCategoryScreen from './Admin/AddCategoryScreen';
import AddItemConditionScreen from './Admin/AddItemConditionScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitle: 'Home',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />
    <Stack.Screen
      name="Onboarding"
      component={OnboardingScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />
    <Stack.Screen
      name="UserVerification"
      component={UserVerification}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitle: 'Profile',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: {
          color: '#000',
        },
      }}
    />
    <Stack.Screen
      name="ForgetPassword"
      component={ForgetPassword}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />
    <Stack.Screen
      name="ResetPasswordVerification"
      component={ResetPasswordVerification}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />

    <Stack.Screen
      name="DetailsScreen"
      component={DetailsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitle: 'Home',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />
    <Stack.Screen
      name="PaymentScreen"
      component={PaymentScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.goBack()}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeOrders"
      component={OrdersScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'My Orders',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('HomeScreen')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="OrderDetails"
      component={OrderDetailsScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('HomeOrders')}
            />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'Profile',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'Profile',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('ProfileScreen')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="About"
      component={AboutScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'About',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('ProfileScreen')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Favourites"
      component={FavouriteItemsScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'Favourite Items',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('ProfileScreen')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="OrderScreen"
      component={OrdersScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'My Orders',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('ProfileScreen')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="SellerOrdersScreen"
      component={SellerOrdersScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'My Shop Orders',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('ProfileScreen')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="OrderDetails"
      component={OrderDetailsScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('OrderScreen')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AccountHistory"
      component={AccountHistory}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'Account History',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('ProfileScreen')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />
  </Stack.Navigator>
);

const SellerStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="AddItem"
      component={AddItem}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'Add Product',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />

    <Stack.Screen
      name="About"
      component={AboutScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'About',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />
  </Stack.Navigator>
);

const AdminStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="AdminDashboard"
      component={AdminDashboard}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'Dashboard',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
      }}
    />
    <Stack.Screen
      name="AddCategoryScreen"
      component={AddCategoryScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'Add Category',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('AdminDashboard')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="CreateBrandsScreen"
      component={CreateBrandsScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'Add Brand',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('AdminDashboard')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="CreateItemTypeScreen"
      component={CreateItemTypeScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'Add Item Type',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('AdminDashboard')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AddItemConditionScreen"
      component={AddItemConditionScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: 'Add Item Condition',
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleStyle: {
          color: COLORS.appTextColor,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              // backgroundColor={COLORS.appTextColor}
              color={COLORS.appTextColor}
              onPress={() => navigation.navigate('AdminDashboard')}
            />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const MainScreen = () => {
  const loggedInUser = useSelector(state => state?.user?.user);
  console.log('loggedin user info main screen', loggedInUser);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          const routeWithNoTarBar = ['DetailsScreen'];
          if (routeWithNoTarBar.includes(routeName)) {
            return {display: 'none'};
          }
          return {
            backgroundColor: COLORS.appBackground,
          };
        })(route),
        tabBarActiveTintColor: COLORS.thriftyColor,
        tabBarColor: COLORS.thriftyColor,
        tabBarInActiveBackgroundColor: '#000',
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Ionicons name="home" color={color} size={26} />
          ),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={({route}) => ({
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <Ionicons name="search" size={26} color={color} />
          ),
          headerShown: false,
        })}
      />

      <Tab.Screen
        name="Sell"
        component={SellerStack}
        options={({route}) => ({
          tabBarLabel: 'Sell',
          tabBarIcon: ({color}) => (
            <Ionicons name="add-circle" color={color} size={26} />
          ),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name={loggedInUser ? 'Dashboard' : 'Chat'}
        component={loggedInUser ? AdminStack : ChatScreen}
        options={({route}) => ({
          tabBarLabel: loggedInUser ? 'Dashboard' : 'Chat',
          tabBarIcon: ({color}) =>
            loggedInUser ? (
              <Ionicons name="apps-outline" color={color} size={26} />
            ) : (
              <Ionicons name="chatbox-outline" color={color} size={26} />
            ),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name={loggedInUser ? 'Profile' : 'Login'}
        component={loggedInUser ? ProfileStack : LoginScreen}
        options={({route}) => ({
          tabBarLabel: loggedInUser ? 'Profile' : 'Login',
          tabBarIcon: ({color}) =>
            loggedInUser ? (
              <Ionicons name="person" color={color} size={26} />
            ) : (
              <Ionicons name="person" color={color} size={26} />
            ),
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
