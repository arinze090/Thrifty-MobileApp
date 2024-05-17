import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_ORDER_AS_SELLER} from '../../utils/graphql/gql-queries';
import OrdersCard from '../../components/cards/OrdersCard';
import {useDispatch, useSelector} from 'react-redux';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import {COLORS} from '../../theme/themes';
import {
  updateSellerOrders,
  updateUserOrders,
} from '../../redux/features/user/userSlice';
import NoOrderAnimation from '../../components/animations/NoOrderAnimation';
import HeaderTitle from '../../components/common/HeaderTitle';

const SellerOrdersScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  console.log('state', state);
  const user = state?.user?.user;
  console.log('user', user);

  const thriftySellerOrders = user?.user?.orders_as_seller;

  console.log('thriftySellerOrders', thriftySellerOrders);

  const [fetchSellersOrderMutation, {loading: fetchSellersOrderLoader}] =
    useLazyQuery(GET_ORDER_AS_SELLER, {
      fetchPolicy: 'network-only',
      // nextFetchPolicy: 'cache-first',
    });

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  let reverseThriftyOrders = [];
  if (thriftySellerOrders) {
    reverseThriftyOrders = [...thriftySellerOrders]?.reverse();
  }

  const loadSellersOrdersFromServer = async () => {
    console.log('--- Fetching loggedIn User Sellers Orders  ---');

    setLoading(true);

    fetchSellersOrderMutation({
      onCompleted: async data => {
        setRefreshing(false);
        console.log('loadSellersOrdersFromServer dataaa', data);

        if (data?.getOrdersAsSeller?.orders?.length) {
          dispatch(updateSellerOrders(data?.getOrdersAsSeller?.orders));
        }
      },
      onError: error => {
        console.log('loadSellersOrdersFromServer error', error);
        setRefreshing(false);
      },
    });
  };

  // Only on new mounts
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadSellersOrdersFromServer();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadSellersOrdersFromServer();
  }, []);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      loadSellersOrdersFromServer();

      console.log('refresged');
    });
    return focusHandler;
  }, []);

  return (
    <View style={styles.container}>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
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
              You currently dont have orders
            </Text>
            <NoOrderAnimation />
          </View>
        )}
        <ScrollViewSpace />
      </ScrollView>
    </View>
  );
};

export default SellerOrdersScreen;

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
