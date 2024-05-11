import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {setPriceTo2DecimalPlaces} from '../../Library/Common';

const RevenueCards = ({props}) => {
  return (
    <TouchableOpacity
      style={[styles.activityCard, {backgroundColor: props.backgroundColor}]}>
      <Ionicons name={props.iconName} size={20} />
      <View style={{marginLeft: 10}}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.value}>
          {props.title == 'Orders'
            ? props.amount
            : setPriceTo2DecimalPlaces(props.amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RevenueCards;

const styles = StyleSheet.create({
  activityCard: {
    width: windowWidth / 2,
    height: windowHeight / 9,
    borderRadius: 10,
    backgroundColor: '#228B22',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
});
