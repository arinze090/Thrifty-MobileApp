import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {getRandomColor} from '../../Library/Common';
import { COLORS } from '../../theme/themes';

const AvatarWithRandomColor = ({firstName}) => {
  const randomColor = getRandomColor();

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 5,
        marginBottom: 5,
        alignItems: 'center',
      }}>
      <View style={[styles.avatarContainer, {backgroundColor: randomColor}]}>
        <Text style={styles.avatarText}>{firstName.charAt(0)}</Text>
      </View>
      <Text style={styles.seller}>{firstName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  seller: {
    color: COLORS.appTextColor,
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

export default AvatarWithRandomColor;
