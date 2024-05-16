import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import SearchBar from '../../components/search/SearchBar';
import Collection from '../../components/common/Collection';
import {useLazyQuery} from '@apollo/client';
import {GET_CATEGORIES} from '../../utils/graphql/gql-queries';
import {
  categoriesFetchLoading,
  getCategories,
} from '../../redux/features/category/categorySlice';
import {COLORS} from '../../theme/themes';

const HomeScreen = ({navigation}) => {
  const state = useSelector(state => state);
  console.log('state', state);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const categories = state?.category?.categories;
  console.log('categories', categories);
  const allSubcategories = categories?.map(({subcategories}) => subcategories);

  const allSubcategoriesFlat = allSubcategories?.flat(1);

  const getItemsTypesInSubCategories = allSubcategoriesFlat?.map(
    ({item_type}) => item_type,
  );

  const getItemsTypesInSubCategoriesFlat = getItemsTypesInSubCategories?.flat();

  const getItemsInSubCategories = getItemsTypesInSubCategoriesFlat?.map(
    ({items}) => items,
  );

  const [fetchData, {loading: categoryLoading}] = useLazyQuery(GET_CATEGORIES, {
    fetchPolicy: 'network-only',
    // nextFetchPolicy: 'cache-first',
  });

  // function for fetching category data and checking for last time data was fetched
  const loadCategoriesFromServer = async () => {
    console.log('--- Fetching data from graphQL server ---');

    setLoading(true);
    dispatch(categoriesFetchLoading(false));

    fetchData({
      onCompleted: async data => {
        if (data?.getCategories?.length > 0) {
          setRefreshing(false);

          dispatch(getCategories({categories: data?.getCategories}));
          dispatch(categoriesFetchLoading(false));
        }
        console.log('dataaa', data);
      },
      onError: error => {
        console.log('error', error);
        setRefreshing(false);
      },
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadCategoriesFromServer();
  }, []);

  return (
    <SafeAreaViewComponent>
      {/* SearchBar Section */}
      <SearchBar onPressIn={() => navigation.navigate('Search')} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.black}
            style={{zIndex: 999}}
          />
        }>
        <Collection />
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
