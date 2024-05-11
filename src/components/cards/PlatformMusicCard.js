import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';

const PlatformMusicCard = ({props, onPress}) => {
  const [loading, setloading] = useState(false);
  const onLoadEnd = () => {
    setloading(true);
  };
  return (
    <View style={{position: 'relative'}}>
      <TouchableOpacity style={styles.profileCard} onPress={onPress}>
        <View>
          <Image
            style={styles.profile}
            source={{uri: props.image}}
            onLoad={onLoadEnd}
            onLoadEnd={onLoadEnd}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.title}>{props.track_name}</Text>
          <Text style={styles.genre}>{props.label}</Text>
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
              <Text style={styles.title}>{props.name}</Text>
              <Text style={styles.genre}>{props.category}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PlatformMusicCard;

const styles = StyleSheet.create({
  profileCard: {
    borderRadius: 10,
    margin: 5,
    //backgroundColor: 'black',
    width: windowWidth / 2.6,
  },
  profile: {
    width: windowWidth / 2.6,
    height: windowHeight / 5,
    borderRadius: 10,
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
    fontSize: 14,
    fontWeight: '800',
    color: 'black',
    paddingBottom: 3,
  },
  genre: {
    marginBottom: 8,
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
    color: '#fff',
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
});
