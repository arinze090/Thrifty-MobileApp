import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {windowWidth} from '../../utils/Dimensions';
import {
  convertTimestampToCustomFormat,
  setPriceTo2DecimalPlaces,
} from '../../Library/Common';

import {COLORS} from '../../theme/themes';

const OrderDetailsCard = ({props}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.orderImage} source={{uri: props?.cover_image}} />
      <View style={styles.orderSection}>
        <View style={styles.orderNameSection}>
          <Text numberOfLines={2} style={styles.orderName}>
            {props?.name}
          </Text>
          <Text style={styles.orderPrice}>
            {setPriceTo2DecimalPlaces(props?.price)}
          </Text>
          <Text style={styles.orderPrice}>{props?.brand?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderDetailsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appBackground,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 15,
    borderBottomColor: 'red',
    // justifyContent: 'space-between',
  },
  orderSection: {
    marginLeft: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  orderNameSection: {
    width: windowWidth / 1.5,
    // backgroundColor: 'green',
  },
  orderImage: {
    width: 70,
    height: 70,
  },
  orderName: {
    color: COLORS.black,
    marginBottom: 5,
  },
  orderPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.appTextColor,
    paddingBottom: 3,
  },
});
