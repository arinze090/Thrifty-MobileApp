import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import SearchBar from '../../components/search/SearchBar';
import Collection from '../../components/common/Collection';

const HomeScreen = ({navigation}) => {
  const state = useSelector(state => state);
  console.log('state', state);

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

  return (
    <SafeAreaViewComponent>
      {/* SearchBar Section */}
      <SearchBar onPressIn={() => navigation.navigate('Search')} />
      <ScrollView>
        <Collection />
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
