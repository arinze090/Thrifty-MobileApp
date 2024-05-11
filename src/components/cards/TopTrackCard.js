import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowWidth} from '../../utils/Dimensions';

const TopTrackCard = ({props, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{props.id}</Text>
      <Image
        source={props.songImage}
        style={{width: 50, height: 50, marginLeft: 10}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: windowWidth / 1.4,
          marginLeft: 10,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Text style={styles.song}>{props.songTitle}</Text>
          <Text style={styles.artisteName}>{props.artiste}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={onPress}
            style={{
              backgroundColor: 'black',
              width: 22,
              height: 22,
              borderRadius: 12,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="play-outline" color="#fff" size={13} />
          </TouchableOpacity>
          <Ionicons name="ellipsis-vertical-outline" color="#333" size={20} />
        </View>
      </View>
    </View>
  );
};

export default TopTrackCard;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    width: windowWidth,
    flexDirection: 'row',
    // justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  count: {
    fontSize: 16,
    fontWeight: '700',
  },
  song: {
    fontSize: 16,
    fontWeight: '700',
  },
  artisteName: {
    fontSize: 14,
    fontWeight: '500',
  },
});
