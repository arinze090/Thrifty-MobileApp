import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import ThriftyCard from '../../components/cards/ThriftyCard';
import {COLORS} from '../../theme/themes';
import {windowWidth} from '../../utils/Dimensions';
import NoOrderAnimation from '../../components/animations/NoOrderAnimation';

const FavouriteItemsScreen = ({navigation}) => {
  const state = useSelector(state => state);

  const reduxLikedProducts = state.user.likedItems;
  console.log('reduxLikedProducts', reduxLikedProducts);
  return (
    <View style={styles.container}>
      <ScrollView>
        {reduxLikedProducts && reduxLikedProducts?.length ? (
          <View style={styles.thriftyItems}>
            {reduxLikedProducts?.map((cur, i) => (
              <View key={i}>
                <ThriftyCard
                  props={cur}
                  //   onPress={() => {
                  //     navigation.navigate('DetailsScreen', cur);
                  //   }}
                />
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text style={styles.nothingToShow}>
              You currently don't have saved items
            </Text>
            <NoOrderAnimation />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default FavouriteItemsScreen;

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
  nothingToShow: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    justifyContent: 'center',
    marginTop: 30,
  },
});
