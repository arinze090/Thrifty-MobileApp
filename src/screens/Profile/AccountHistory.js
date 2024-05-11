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

const AccountHistory = () => {
  const userId = useSelector(state => state?.user?.user?.user?.id);
  const tnxHistory = useSelector(state => state?.user?.tnxHistory);
  const userBalances = useSelector(state => state?.user?.userBalances);

  const dispatch = useDispatch();
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
        if (data?.getUserBalance?.code === 200) {
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
        if (data?.getUserTnxHistory?.code === 200) {
          //   dispatch(setTnxHistory(data?.getUserTnxHistory?.transactionHistory));
          setRefreshing(false);
          console.log('dataaaa ::', data?.getUserTnxHistory);

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
    <View>
      <Text>AccountHistory</Text>
    </View>
  );
};

export default AccountHistory;

const styles = StyleSheet.create({});
