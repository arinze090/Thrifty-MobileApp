import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_ORDER_AS_BUYER} from '../../utils/graphql/gql-queries';
import OrdersCard from '../../components/cards/OrdersCard';
import {useDispatch, useSelector} from 'react-redux';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import {COLORS} from '../../theme/themes';
import {updateUserOrders} from '../../redux/features/user/userSlice';
import NoOrderAnimation from '../../components/animations/NoOrderAnimation';
import HeaderTitle from '../../components/common/HeaderTitle';

const OrdersScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  console.log('state', state);
  const user = state?.user?.user;
  console.log('user', user);

  const thriftyBuyerOrders = user?.user?.orders_as_buyer;

  console.log('thriftyBuyerOrders', thriftyBuyerOrders);

  const [fetchBuyersOrderMutation, {loading: fetchbuyersOrderLoader}] =
    useLazyQuery(GET_ORDER_AS_BUYER, {
      fetchPolicy: 'network-only',
      // nextFetchPolicy: 'cache-first',
    });

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  let reverseThriftyOrders = [];
  if (thriftyBuyerOrders) {
    reverseThriftyOrders = [...thriftyBuyerOrders].reverse();
  }

  const loadBuyersOrdersFromServer = async () => {
    console.log('--- Fetching loggedIn User Orders  ---');

    setLoading(true);

    fetchBuyersOrderMutation({
      onCompleted: async data => {
        setRefreshing(false);
        console.log('loadBuyersOrdersFromServer dataaa', data);

        if (data?.getOrdersAsBuyer?.orders?.length) {
          dispatch(updateUserOrders(data?.getOrdersAsBuyer?.orders));
        }
      },
      onError: error => {
        console.log('loadBuyersOrdersFromServer error', error);
        setRefreshing(false);
      },
    });
  };

  // Only on new mounts
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadBuyersOrdersFromServer();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadBuyersOrdersFromServer();
  }, []);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      loadBuyersOrdersFromServer();

      console.log('refresged');
    });
    return focusHandler;
  }, []);

  return (
    <View style={styles.container}>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation?.goBack();
        }}
        headerTitle={'Orders'}
        rightIcon={'menu-outline'}
        onRightIconPress={() => {
          navigation.openDrawer();
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.appTextColor}
            style={{zIndex: 999}}
          />
        }>
        {reverseThriftyOrders?.length ? (
          reverseThriftyOrders?.map((cur, i) => {
            return (
              <OrdersCard
                key={i}
                props={cur}
                onPress={() => {
                  navigation.navigate('OrderDetails', cur);
                }}
              />
            );
          })
        ) : (
          <View>
            <Text style={styles.nothingToShow}>
              You currently don't have orders
            </Text>
            <NoOrderAnimation />
          </View>
        )}
        <ScrollViewSpace />
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  nothingToShow: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    justifyContent: 'center',
    marginTop: 30,
  },
});
