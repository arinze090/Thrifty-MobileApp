import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import {windowHeight} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';
import {useSelector} from 'react-redux';
import ThriftyCard from '../../components/cards/ThriftyCard';
import CategorySearchBar from '../../components/search/CategorySearchBar';

const SearchScreen = ({navigation}) => {
  const state = useSelector(state => state);
  console.log('state', state);

  const reduxThriftyItems = state.category.thriftyItems;
  console.log('thriftyItems', reduxThriftyItems);

  // Search filter states
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState('');

  const [masterDataSource, setMasterDataSource] = useState(reduxThriftyItems);
  const [filteredDataSource, setFilteredDataSource] =
    useState(reduxThriftyItems);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  // const searchFilterFunction = text => {
  //   if (text) {
  //     setSearch(text);
  //   } else {
  //     // Inserted text is blank
  //     // Update FilteredDataSource with masterDataSource
  //     setSearch(text);
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      {/* SearchBar Section */}
      <CategorySearchBar
        searchPhrase={search}
        setSearchPhrase={text => searchFilterFunction(text)}
        clicked={clicked}
        setClicked={setClicked}
        autoFocus={true}
      />

      {search === '' ? (
        <View style={styles.searchCat}>
          <Text style={styles.searchCatText} />
        </View>
      ) : (
        <ScrollView vertical contentContainerStyle={styles.scrollviewContainer}>
          {filteredDataSource?.map((cur, i) => {
            return (
              <View key={cur.id + '-' + cur.name + '-' + i}>
                <ThriftyCard
                  props={cur}
                  onPress={() => navigation.navigate('DetailsScreen', cur)}
                />
              </View>
            );
          })}
          <View
            style={[
              styles.section,
              {marginTop: windowHeight / 2, minHeight: 200},
            ]}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  scrollviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
    marginLeft: 6,
  },
  searchCat: {
    margin: 20,
    // backgroundColor: 'pink',
    marginTop: 30,
  },
  searchCatText: {
    color: COLORS.appTextColor,
    fontSize: 15,
    fontWeight: '700',
  },
});
