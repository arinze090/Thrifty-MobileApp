import {
  Alert,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';

const about = [
  {
    iconName: 'terminal-outline',
    name: 'Terms & Condition',
    navigate: 'Terms & Condition',
  },
  {
    iconName: 'information-circle-outline',
    name: 'About Us',
    navigate: 'About Us',
  },
  {
    iconName: 'eye-outline',
    name: 'Privacy Policy',
    navigate: 'Privacy Policy',
  },
  {
    iconName: 'chatbubbles-outline',
    name: 'FAQs',
    navigate: 'FAQs',
  },
  // {
  // 	iconName: 'globe-outline',
  // 	name: 'Visit Our Website',
  // 	navigate: 'ShouttyWebsite',
  // },
];
const AboutScreen = ({navigation}) => {
  const openWebsite = () => {
    Linking.openURL('https://shoutty.app')
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.settings}>
        {about?.map((cur, i) => (
          <TouchableOpacity
            key={i}
            style={styles.set}
            onPress={() => navigation.navigate(cur?.navigate)}>
            <View style={styles.setsContent}>
              <Ionicons name={cur?.iconName} size={20} color={COLORS.black} />
              <Text style={styles.settingsText}>{cur?.name}</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.black}
              style={{marginTop: 5}}
            />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.set}
          onPress={() => {
            openWebsite();
          }}>
          <View style={styles.setsContent}>
            <Ionicons name="globe-outline" size={20} color={COLORS.black} />
            <Text style={styles.settingsText}>Visit Our Website</Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="#333"
            style={{marginTop: 5}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  imageSection: {
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.pinky,
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
    color: 'white',
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
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  settings: {
    margin: 5,
    marginTop: 30,
    // borderTopWidth: 1,
    marginBottom: 20,
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
  settingsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginLeft: 17,
  },
});
