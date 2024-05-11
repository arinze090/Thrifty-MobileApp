import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import TransparentBtn from '../form/TransparentBtn';

const NotificationCard = ({props}) => {
  return (
    <View style={styles.notificationCard}>
      <Text style={styles.name}>{props.name}</Text>
      <TransparentBtn title={'View'} width={5} height={25} />
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  notificationCard: {
    width: windowWidth / 1.1,
    height: windowHeight / 14,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});
