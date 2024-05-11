import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import OrderDetailsCard from '../../components/cards/OrderDetailsCard';
import {
  convertTimestampToCustomFormat,
  setPriceTo2DecimalPlaces,
} from '../../Library/Common';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';

const OrderDetailsScreen = ({route, navigation}) => {
  const item = route.params;
  console.log('item', item);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {item?.items?.map((cur, i) => (
          <OrderDetailsCard props={cur} />
        ))}

        {/* Payment Section */}
        <View style={{marginBottom: 20}}>
          <Text style={styles.summary}>Payment Details</Text>

          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Buyer Protection Fee</Text>
            <Text style={styles.summaryA}>
              {setPriceTo2DecimalPlaces(item?.price_breakdown?.platform_fee)}
            </Text>
          </View>
          <View style={styles.breaker} />
          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Delivery Fee</Text>
            <Text style={styles.summaryA}>
              {setPriceTo2DecimalPlaces(item?.price_breakdown?.delivery_fee)}
            </Text>
          </View>
          <View style={styles.breaker} />
          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Items Price</Text>
            <Text style={styles.summaryA}>
              {setPriceTo2DecimalPlaces(
                item?.price_breakdown?.total_items_price,
              )}
            </Text>
          </View>
          <View style={styles.breaker} />
          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Total</Text>
            <Text style={styles.summaryA}>
              {setPriceTo2DecimalPlaces(
                item?.price_breakdown?.total_accumulated_price,
              )}
            </Text>
          </View>

          <View style={styles.breaker} />
          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Payment</Text>
            <Text style={styles.summaryA}>
              {convertTimestampToCustomFormat(parseInt(item?.createdAt))}
            </Text>
          </View>
          <View style={styles.breaker} />
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={styles.summary}>Delivery Details</Text>
          <Text style={styles.deliverySection}>
            {item.delivery_details.apt_or_suite_number}{' '}
            {item.delivery_details.street_address}
            {','} {item.delivery_details.city}
            {', '}
            {item.delivery_details.state}
          </Text>
        </View>
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  br: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  Q: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: windowHeight / 15,
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  breaker: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  summary: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 5,
    marginBottom: 5,
    color: COLORS.appTextColor,
  },
  summaryQ: {
    color: COLORS.appTextColor,
    // fontWeight: '500',
    fontSize: 14,
    // backgroundColor: 'red',
    // width: windowWidth / 1.3,
  },
  summaryQ1: {
    color: COLORS.appTextColor,
    // fontWeight: '500',
    fontSize: 14,
    // backgroundColor: 'red',
    width: windowWidth / 1.3,
  },
  summaryA: {
    color: COLORS.appTextColor,
    // fontWeight: '500',
    fontSize: 14,
  },
  summaryQ2: {
    color: COLORS.appTextColor,
    fontWeight: '700',
    fontSize: 14,
  },
  deliverySection: {
    fontSize: 14,
  },
});
