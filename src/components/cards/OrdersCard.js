import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {windowWidth} from '../../utils/Dimensions';
import {
  convertTimestampToCustomFormat,
  setPriceTo2DecimalPlaces,
  timestampToDate,
} from '../../Library/Common';
import {
  orderDetailsColorPrecedence,
  orderDetailsTextPrecedence,
} from '../../Library/OrderPrecedence';
import {COLORS} from '../../theme/themes';

const OrdersCard = ({props, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.orderImage}
        source={{uri: props.items[0].cover_image}}
      />
      <View style={styles.orderSection}>
        <View style={styles.orderNameSection}>
          <Text numberOfLines={2} style={styles.orderName}>
            {props.items[0].name}
          </Text>

          <Text
            style={[
              styles.orderStatus,
              {
                color: orderDetailsColorPrecedence(
                  props,
                  COLORS.red,
                  'green',
                  'blue',
                  COLORS.appTextColor,
                  'black',
                ),
              },
            ]}>
            {orderDetailsTextPrecedence(props)}
          </Text>
          <View style={styles.brand}>
            <Text numberOfLines={1} style={styles.orderDate}>
              {timestampToDate(parseInt(props.createdAt))}
            </Text>
            <Text style={styles.orderPrice}>
              {setPriceTo2DecimalPlaces(props.total_price_paid)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrdersCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 15,
    // justifyContent: 'space-between',
  },
  orderSection: {
    marginLeft: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: 'green',
    // width: windowWidth / 3,
  },
  orderNameSection: {
    // width: windowWidth / 2,
    // backgroundColor: 'green',
  },
  orderImage: {
    width: 70,
    height: 70,
  },
  orderName: {
    color: COLORS.black,
    width: windowWidth / 1.1,
  },
  orderPrice: {
    // width: windowWidth / 9,
    // marginLeft: 10,
    marginRight: 20,
    // backgroundColor: 'red',
  },
  brand: {
    flexDirection: 'row',
    width: windowWidth / 1.4,
    marginTop: 10,
    // backgroundColor: 'red',
  },
  orderDate: {
    width: windowWidth / 2.2,
  },
});
