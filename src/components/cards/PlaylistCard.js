import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {windowHeight, windowWidth} from '../../utils/Dimensions';

const PlaylistCard = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: windowWidth / 1.2,
          //   marginLeft: 10,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.playlistSection}>
          <Image
            source={require('../../assets/2.jpg')}
            style={styles.playlistImage}
          />
          <View>
            <Text style={styles.song}>First Playlist</Text>
            <Text style={styles.artisteName}>Playlist</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistCard;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: windowWidth / 1.05,
    flexDirection: 'row',
    // justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
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
    fontSize: 12,
    fontWeight: '400',
  },
  playlistSection: {
    flexDirection: 'row',
    // justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
  },
  playlistImage: {
    width: windowWidth / 8,
    height: windowHeight / 18,
    backgroundColor: 'green',
    marginRight: 10,
  },
});
