import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowWidth} from '../../utils/Dimensions';

const TopTracksCard = ({props}) => {
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
          width: windowWidth / 1.8,
          marginLeft: 10,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Text style={styles.song}>{props.songTitle}</Text>
          <Text style={styles.artisteName}>{props.artiste}</Text>
        </View>
        <Ionicons name="ellipsis-vertical-outline" color="#333" size={20} />
      </View>
    </View>
  );
};

export default TopTracksCard;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    width: windowWidth / 1.15,
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
