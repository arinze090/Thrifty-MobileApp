import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS} from '../../theme/themes';
import {
  RNToast,
  setPriceTo2DecimalPlaces,
  convertDateToSubstring,
} from '../../Library/Common';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {
  GET_TNX_HISTORY,
  GET_USER_BALANCE,
} from '../../utils/graphql/gql-queries';
import {
  setTnxHistory,
  setUserBalances,
} from '../../redux/features/user/userSlice';
import TnxCard from '../../components/cards/TnxCard';
import HeaderTitle from '../../components/common/HeaderTitle';

const AccountHistory = ({navigation}) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state?.user?.user?.user?.wallet);
  const tnxHistory = useSelector(state => state?.user?.tnxHistory);
  const userBalances = useSelector(state => state?.user?.user?.user?.wallet);

  console.log('userWallet', user);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log('loadinggg', loading);

  const [fetchUserBalance, {loading: fetchUserBalanceLoader}] = useLazyQuery(
    GET_USER_BALANCE,
    {
      fetchPolicy: 'cache-and-network',
      //   nextFetchPolicy: 'cache-first',
    },
  );

  const fetchUserBalances = () => {
    console.log('--- Fetching User Balances ---');
    setLoading(true);
    fetchUserBalance({
      //   variables: {userId: userId},

      onCompleted: async data => {
        if (data?.getUserBalance?.success) {
          //   dispatch(setUserBalances(data?.getUserBalance));
          console.log('getUserBalance', data?.getUserBalance);
          setLoading(false);
        }
      },
      onError: error => {
        console.log('error', error);
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    fetchUserBalances();
  }, []);

  let reverseAccountHistory = [];
  if (tnxHistory) {
    reverseAccountHistory = [...tnxHistory].reverse();
  }
  const [fetchAccountHistory, {loading: fetchAccountHistoryLoader}] =
    useLazyQuery(GET_TNX_HISTORY, {
      fetchPolicy: 'cache-and-network',
      // nextFetchPolicy: 'cache-first',
    });

  const fetchAccountHistoryFromServer = async () => {
    console.log('--- Fetching Account History ---');

    fetchAccountHistory({
      onCompleted: async data => {
        if (data?.getTnxHistory?.success) {
          dispatch(setTnxHistory(data?.getTnxHistory?.history));
          setRefreshing(false);
          console.log('dataaaa ::', data?.getTnxHistory?.history);

          // Toast a message to the user if the code == 200 or successful
          Toast.show({
            type: 'thriftyToast',
            text2: 'Awesome! Your transaction history is up to date',
          });
        }
      },
      onError: error => {
        console.log('error', error);
      },
    });
  };

  // Only on new mounts
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchAccountHistoryFromServer();
      //   fetchUserBalances();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAccountHistoryFromServer();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Account History'}
        rightIcon={'menu-outline'}
        onRightIconPress={() => {
          navigation.openDrawer();
        }}
      />
      <View style={styles.accountContainer}>
        <Text style={styles.accountTitle}>Available Balance</Text>
        <Text style={styles.accountValue}>
          {fetchUserBalanceLoader ? (
            <ActivityIndicator color="white" />
          ) : (
            setPriceTo2DecimalPlaces(userBalances?.available_balance)
          )}
        </Text>
        <View style={styles.pendingContainer}>
          <Text style={[styles.accountTitle, {marginRight: 10}]}>
            Pending Balance:
          </Text>
          <Text style={[styles.accountValue, {fontSize: 20}]}>
            {fetchUserBalanceLoader ? (
              <ActivityIndicator color="white" />
            ) : (
              setPriceTo2DecimalPlaces(userBalances?.pending_balance)
            )}
          </Text>
        </View>
      </View>
      <View style={styles.transactionContainer}>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Text
            style={[
              styles.accountTitle,
              {color: 'black', marginRight: 10, fontSize: 16},
            ]}>
            Transaction History
          </Text>
          <Ionicons name="repeat-outline" size={20} color="#000" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.white}
              style={{zIndex: 999}}
            />
          }>
          {tnxHistory?.map((cur, i) => {
            return (
              <TnxCard
                key={i}
                props={cur}
                onPress={() => {
                  // dispatch(setTnxHistoryDetails(cur));
                  // navigation.navigate('TransactionHistoryDetails', cur);
                }}
              />
            );
          })}
          <View style={[styles.section, {marginTop: 150, minHeight: 200}]} />
        </ScrollView>
      </View>
    </View>
  );
};

export default AccountHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
  },
  accountContainer: {
    // backgroundColor: '#C6D0BC',
    // backgroundColor: '#A9AEFF',
    backgroundColor: '#000',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  pendingContainer: {
    // flexDirection: 'row',
    marginTop: 20,
    // alignContent: 'center',
    // alignItems: 'center',
  },
  accountTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  accountValue: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },
  transactionContainer: {
    backgroundColor: COLORS.appBackground,
    height: windowHeight,
    width: windowWidth,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    marginBottom: 10,
  },
  transactionCard: {
    height: windowHeight / 11,
    width: windowWidth / 1.12,
    // backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },
});
