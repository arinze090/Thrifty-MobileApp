import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ThriftyCard from '../cards/ThriftyCard';
import {windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';
import {useNavigation} from '@react-navigation/native';
import {setThriftyItems} from '../../redux/features/category/categorySlice';

const Collection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const categories = state?.category?.categories;
  const allSubcategories = categories?.map(({subcategories}) => subcategories);
  const allSubcategoriesFlat = allSubcategories?.flat(1);

  const getItemsTypesInSubCategories = allSubcategoriesFlat?.map(
    ({item_type}) => item_type,
  );

  const getItemsTypesInSubCategoriesFlat =
    getItemsTypesInSubCategories?.flat(1);

  const getItemsInSubCategories = getItemsTypesInSubCategoriesFlat?.map(
    ({items}) => items,
  );

  const getItemsInSubCategoriesFlat = getItemsInSubCategories?.flat(1);
  console.log('getItemsInSubCategoriesFlat', getItemsInSubCategoriesFlat);

  // Remove null elements from the array
  const filteredArray = getItemsInSubCategoriesFlat?.filter(
    obj => obj !== null,
  );

  console.log('filteredArray', filteredArray);

  const dispatchThriftyItemsArray = () => {
    dispatch(setThriftyItems(filteredArray));
  };

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     filteredArray ? dispatchThriftyItemsArray() : null;
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [filteredArray]);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      // loadShouttyFromServer();
      dispatchThriftyItemsArray();

      console.log('focused');
    });
    return focusHandler;
  }, []);

  return (
    <View style={styles.container}>
      {categories && categories?.length ? (
        <View style={styles.thriftyItems}>
          {filteredArray &&
            filteredArray?.length &&
            filteredArray?.map((cur, i) => (
              <View key={i}>
                <ThriftyCard
                  props={cur}
                  onPress={() => {
                    navigation.navigate('DetailsScreen', cur);
                  }}
                />
              </View>
            ))}
        </View>
      ) : (
        <View>
          <Text>No products for now, come back later</Text>
        </View>
      )}
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
  },
  thriftyItems: {
    flexDirection: 'row',
    backgroundColor: COLORS.appBackground,
    width: windowWidth,
    // display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    // alignItems: 'center',
    padding: 8,
    // margin: 10,
  },
});
