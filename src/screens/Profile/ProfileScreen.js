import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';
import {useDispatch, useSelector} from 'react-redux';
import {signOutUser} from '../../redux/features/user/userSlice';
import {setPriceTo2DecimalPlaces} from '../../Library/Common';

const settings = [
  // {
  //   iconName: 'person-outline',
  //   name: 'Profile Settings',
  //   navigate: 'Profile Settings',
  // },
  {
    iconName: 'cart-outline',
    name: 'Shop Orders',
    navigate: 'SellerOrdersScreen',
  },
  {
    iconName: 'receipt-outline',
    name: 'My Orders',
    navigate: 'OrderScreen',
  },
  {
    iconName: 'heart-outline',
    name: 'Favourite Items',
    navigate: 'Favourites',
  },

  // {
  //   iconName: 'wallet-outline',
  //   name: 'Wallet',
  //   navigate: 'AccountHistory',
  // },
  {
    iconName: 'information-circle-outline',
    name: 'About Thrifty',
    navigate: 'About',
  },
];

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const loggedInUser = state?.user?.user?.user;
  const userBalances = state?.user?.user?.user?.wallet;

  function logout() {
    console.log('logout');
    dispatch(signOutUser());

    navigation.navigate('HomeScreen');
  }

  console.log('userrr', loggedInUser);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.profile}
        onPress={() => {
          navigation.navigate('EditProfile');
        }}>
        <Image
          source={require('../../assets/user-dummy-img.jpg')}
          style={styles.profileImage}
        />
        <View style={styles.viewProfile}>
          <View>
            <Text style={styles.username}>{loggedInUser.firstname}</Text>
            <Text style={styles.viewProfiletext}>View Profile</Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color={COLORS.appTextColor}
            style={{marginTop: 5}}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.set}
        onPress={() => {
          navigation.navigate('AccountHistory');
        }}>
        <View style={styles.setsContent}>
          <Ionicons
            name="wallet-outline"
            size={20}
            color={COLORS.appTextColor}
          />
          <Text style={styles.settingsText}>
            Wallet Balance -{' '}
            {setPriceTo2DecimalPlaces(userBalances?.available_balance)}{' '}
          </Text>
        </View>
      </TouchableOpacity>
      {settings?.map((cur, i) => (
        <TouchableOpacity
          key={i}
          style={styles.set}
          onPress={() => navigation.navigate(cur?.navigate)}>
          <View style={styles.setsContent}>
            <Ionicons
              name={cur?.iconName}
              size={20}
              color={COLORS.appTextColor}
            />
            <Text style={styles.settingsText}>{cur?.name}</Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color={COLORS.appTextColor}
            style={{marginTop: 5}}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.set} onPress={logout}>
        <View style={styles.setsContent}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color={COLORS.appTextColor}
          />
          <Text style={styles.settingsText}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
  },
  imageSection: {
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 45,
    // marginBottom: 10,
    // borderWidth: 2,
    // borderColor: COLORS.pinky,

    alignSelf: 'center',
  },
  celebProfileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.purple,
  },
  profileText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.appTextColor,
  },
  editBtn: {
    backgroundColor: COLORS.pinky,
    borderRadius: 6,
    width: windowWidth / 1.4,
    alignSelf: 'center',
    alignItems: 'center',
    height: windowHeight / 19,
    justifyContent: 'center',
  },
  btnText: {
    color: COLORS.appTextColor,
    fontSize: 15,
    fontWeight: '700',
  },
  settings: {
    margin: 5,
    marginTop: 30,
    borderTopWidth: 1,
    marginBottom: 20,
  },
  set: {
    // marginBottom: 8,
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
  },
  setsContent: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    margin: 5,
    // marginTop: 10,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.appTextColor,
    marginLeft: 17,
  },
  loadingIndicator: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    position: 'absolute',
    height: windowHeight,
    backgroundColor: '#000',
    opacity: 0.9,
    width: windowWidth,
    justifyContent: 'center',
    alignContent: 'center',
  },
  loadingIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  profile: {
    flexDirection: 'row',
    // backgroundColor: 'green',
    padding: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  viewProfile: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: windowWidth / 1.15,
  },
  username: {
    color: COLORS.appTextColor,
    fontWeight: '700',
  },
  viewProfiletext: {
    color: COLORS.appTextColor,
  },
});
