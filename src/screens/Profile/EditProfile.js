import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import FormInput from '../../components/form/FormInput';
import {COLORS} from '../../theme/themes';
import {windowHeight} from '../../utils/Dimensions';
import FormButton from '../../components/form/FormButton';
import HeaderTitle from '../../components/common/HeaderTitle';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const user = state?.user?.user?.user;
  console.log('editUser', user);

  const [firstName, setfirstName] = useState(user ? user?.firstname : '');
  const [lastName, setLastName] = useState(user ? user?.lastname : '');
  const [email, setEmail] = useState(user ? user?.email : '');
  const [phoneNumber, setPhoneNumber] = useState(user ? user?.mobile : '');

  return (
    <ScrollView style={styles.container}>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={''}
        rightIcon={'menu-outline'}
        onRightIconPress={() => {
          navigation.openDrawer();
        }}
      />
      <View style={{marginTop: 20}}>
        <View style={styles.userContent}>
          <View style={styles.profile}>
            <Ionicons
              style={styles.icon}
              name="person-outline"
              color={COLORS.appBlack}
              size={20}
            />
            <Text style={styles.userTitle}>First Name</Text>
          </View>
          <FormInput value={firstName} width={1.1} />
        </View>
        <View style={styles.userContent}>
          <View style={styles.profile}>
            <Ionicons
              style={styles.icon}
              name="person-outline"
              color={COLORS.appBlack}
              size={20}
            />
            <Text style={styles.userTitle}>Last Name</Text>
          </View>
          <FormInput value={lastName} width={1.1} />
        </View>
        <View style={styles.userContent}>
          <View style={styles.profile}>
            <Ionicons
              style={styles.icon}
              name="mail-outline"
              color={COLORS.appBlack}
              size={20}
            />
            <Text style={styles.userTitle}>Email Address</Text>
          </View>
          <FormInput
            value={email}
            editable={false}
            width={1.1}
            placeholderTextColor={COLORS.appBlack}
          />
        </View>

        <View style={styles.userContent}>
          <View style={styles.profile}>
            <Ionicons
              style={styles.icon}
              name="call-outline"
              color={COLORS.appBlack}
              size={20}
            />
            <Text style={styles.userTitle}>Mobile</Text>
          </View>
          <FormInput value={phoneNumber} width={1.1} />
        </View>

        <View style={{marginTop: 20}}>
          <FormButton title={'Edit Profile'} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    padding: 10,
  },
  content: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    // marginTop: 5,
    borderBottomColor: '#333',
    borderBottomWidth: 2,
    marginBottom: 8,
    height: windowHeight / 14,
    alignContent: 'center',
    alignItems: 'center',
  },
  set: {
    marginBottom: 8,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    padding: 10,
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
    marginTop: 10,
  },
  userfield: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginLeft: 17,
  },
  userfieldText: {
    fontSize: 16,
    // fontWeight: '700',
    color: '#ccc',
    marginLeft: 17,
  },
  userContent: {
    // backgroundColor: 'red',
    padding: 10,
    // marginTop: 5,
    // borderBottomColor: '#333',
    // borderBottomWidth: 2,
    marginBottom: 8,
    // alignContent: 'center',
    // alignItems: 'center',
  },
  userTitle: {
    fontSize: 16,
    // fontWeight: '700',
    color: COLORS.appBlack,
    marginBottom: 10,
    // marginLeft: 17,
  },
  profile: {
    alignContent: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginBottom: 10,
    marginRight: 10,
  },
});
