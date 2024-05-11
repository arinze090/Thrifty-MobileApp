import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowWidth} from '../../utils/Dimensions';

const MusicDetailsCard = ({props}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: windowWidth / 1.2,
          //   marginLeft: 10,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Text style={styles.song}>{props.track_name}</Text>
          <Text style={styles.artisteName}>{props.label}</Text>
        </View>
        <Ionicons name="ellipsis-horizontal-outline" color="#333" size={20} />
      </View>
    </View>
  );
};

export default MusicDetailsCard;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: windowWidth / 1.1,
    flexDirection: 'row',
    // justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
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
