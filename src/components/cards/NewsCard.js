import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {convertUnixTimestampToDateString} from '../../Library/Common';

const NewsCard = ({props, onPress}) => {
  console.log('propss', props);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{uri: props.Image}} style={styles.image} />
      <Text numberOfLines={2} style={styles.newText}>
        {props.Description}
      </Text>
      <Text style={styles.date}>
        {convertUnixTimestampToDateString(props.ApprovalTime)}
      </Text>
    </TouchableOpacity>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    padding: 20,
  },
  image: {
    width: windowWidth / 1.12,
    height: windowHeight / 5,
  },
  newText: {
    color: 'black',
    fontSize: 14,
    width: windowWidth / 1.15,
    marginTop: 7,
    marginBottom: 6,
  },
  date: {
    color: '#888',
    fontSize: 11,
  },
});
