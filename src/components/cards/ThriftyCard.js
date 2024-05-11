import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';
import {
  checkForLikedItemsInRedux,
  setPriceTo2DecimalPlaces,
} from '../../Library/Common';
import AvatarWithRandomColor from '../common/AvatarWithRandomColor';
import {useSelector} from 'react-redux';

const ThriftyCard = ({props, onPress}) => {
  const [loading, setloading] = useState(false);
  const onLoadEnd = () => {
    setloading(true);
  };
  console.log('loading', loading);

  const state = useSelector(state => state);

  const reduxLikedProducts = state?.user?.likedItems;
  console.log('reduxLikedProducts', reduxLikedProducts);

  const checkIfProductIsLiked = checkForLikedItemsInRedux(
    reduxLikedProducts,
    props?.id,
  );
  return (
    <View style={{position: 'relative'}}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.profileCard}
        onPress={onPress}>
        {props?.owner?.image ? (
          <View style={{flexDirection: 'row', padding: 5, marginBottom: 5}}>
            <Image
              source={{uri: props?.cover_image}}
              style={styles.sellerIcon}
            />
            <Text style={styles.seller}>{props?.owner?.firstname}</Text>
          </View>
        ) : (
          <AvatarWithRandomColor firstName={props?.owner?.firstname} />
        )}
        <View>
          <Image
            style={styles.profile}
            source={{uri: props?.cover_image}}
            onLoad={onLoadEnd}
            onLoadEnd={onLoadEnd}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text numberOfLines={2} style={styles.productName}>
            {props?.name}
          </Text>
          <View style={styles.priceSection}>
            <Text style={styles.title}>
              {setPriceTo2DecimalPlaces(props?.price)}
            </Text>
            <Ionicons
              name={checkIfProductIsLiked ? 'heart' : 'heart-outline'}
              color="red"
              size={15}
              style={{marginRight: 6}}
            />
          </View>
          <Text style={styles.genre}>{props?.brand?.name}</Text>
          <Text style={styles.genre}>{props?.condition?.name}</Text>
        </View>
      </TouchableOpacity>
      {!loading && (
        <View style={{position: 'absolute', top: 0, zIndex: 1000}}>
          <TouchableOpacity style={styles.profileCard} onPress={onPress}>
            <SkeletonPlaceholder
              highlightColor={COLORS.skeletonHighlightColor}
              backgroundColor={COLORS.skeletonBgColor}
              speed={1900}>
              <Image style={styles.profile} source={''} />
            </SkeletonPlaceholder>
            <View style={styles.profileInfo}>
              <Text numberOfLines={2} style={styles.productName}>
                {props?.name}
              </Text>
              <View style={styles.priceSection}>
                <Text style={styles.title}>
                  {setPriceTo2DecimalPlaces(props?.price)}
                </Text>
                <Text style={styles.genre}>Arinze</Text>
              </View>
              <Text style={styles.genre}>{props?.brand?.name}</Text>
              <Text style={styles.genre}>{props?.size}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ThriftyCard;

const styles = StyleSheet.create({
  profileCard: {
    // borderRadius: 5,
    margin: 5,
    backgroundColor: COLORS.appBackground,
    width: windowWidth / 2.4,
    marginBottom: 10,
    marginRight: 10,
  },
  profile: {
    width: windowWidth / 2.4,
    height: windowHeight / 5,
    // borderRadius: 10,
  },
  profiles: {
    width: windowWidth / 2.6,
    height: windowHeight / 5,
    borderRadius: 10,
  },
  profileInfo: {
    paddingTop: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.appTextColor,
    paddingBottom: 3,
  },
  genre: {
    marginBottom: 5,
    color: '#828282',
    fontSize: 12,
    // paddingBottom: 5,
  },
  box: {
    backgroundColor: '#000',
    //justifyContent: 'center',
    //alignContent: 'center',
    //alignItems: 'center',
    //alignSelf: 'center',
    //marginTop: windowHeight / 1,
    //width: windowWidth / 3,
    zIndex: 1000,
    position: 'absolute',
    padding: 10,
    paddingLeft: 0,
    paddingRight: 15,
    opacity: 0.4,
    top: 10,
  },
  boxText: {
    color: COLORS.appTextColor,
    fontSize: 20,
    fontWeight: '700',
    opacity: 0.8,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    alignItems: 'center',
    paddingBottom: 5,
  },
  price: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '700',
  },
  delivery: {
    color: '#ccc',
    fontSize: 10,
    fontWeight: '700',
  },
  sellerIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  seller: {
    color: COLORS.appTextColor,
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  productName: {
    color: COLORS.appTextColor,
    fontSize: 13,
    // fontWeight: '500',
    marginBottom: 10,
  },
});
