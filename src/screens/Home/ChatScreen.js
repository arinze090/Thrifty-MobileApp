import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme/themes';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import FormButton from '../../components/form/FormButton';

const ChatScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logIn}>
        <Text style={styles.follow}>Chat with sellers on the platform</Text>
        <Text style={styles.followDescription}>
          To get access to exclusive chats with sellers, buyers, deals and more!
          Coming soon
        </Text>
        <FormButton
          title="Explore trending feeds"
          marginTop={20}
          width={1.5}
          onPress={() => navigation.navigate('HomeScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    justifyContent: 'center',
    // alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  logIn: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.appTextColor,
    fontSize: 17,
    fontWeight: '700',
  },
  btn: {
    width: windowWidth / 1.5,
    height: windowHeight / 17,
    backgroundColor: COLORS.pinky,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',

    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  icon: {
    marginBottom: 30,
  },
  follow: {
    color: COLORS.appTextColor,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  followDescription: {
    color: COLORS.appTextColor,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
  },
  sortCat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.optionBorderColor,
    borderRadius: 25,
    padding: 5,
  },
  activeCat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.pinky,
    borderRadius: 25,
    padding: 5,
  },
});
