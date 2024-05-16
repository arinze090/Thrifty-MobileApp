import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {
  setPriceTo2DecimalPlaces,
  convertDateToSubstring,
  capitalizeFirstCharacter,
} from '../../Library/Common';
import {COLORS} from '../../theme/themes';

const TnxCard = ({props, onPress}) => {
  console.log('props', props);
  return (
    <TouchableOpacity style={styles.transactionCard} onPress={onPress}>
      <Ionicons
        name={
          props?.type == 'credit'
            ? 'trending-down-outline'
            : 'trending-up-outline'
        }
        size={20}
        color={props?.type == 'credit' ? '#10754d' : COLORS.pinky}
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          alignContent: 'center',
        }}
      />
      <View style={styles.transactionDetails}>
        <View>
          <Text
            numberOfLines={1}
            style={[styles.transactionName, {color: '#000'}]}>
            {capitalizeFirstCharacter(props?.transaction)}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.transactionDate}>
            {convertDateToSubstring(parseInt(props?.date))}
          </Text>
          <Text
            style={[
              styles.transactionAmount,
              {color: props?.type == 'credit' ? '#10754d' : COLORS.pinky},
            ]}>
            {setPriceTo2DecimalPlaces(props?.amount)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TnxCard;

const styles = StyleSheet.create({
  transactionCard: {
    height: windowHeight / 11,
    width: windowWidth / 1.1,
    // backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginTop: 6,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  transactionName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
    width: '90%',
  },
  transactionDate: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ccc',
  },
  transactionDetails: {
    display: 'flex',
    // flexDirection: 'row',
    marginLeft: 10,
    // justifyContent: 'space-between',
    width: '90%',
  },
});
