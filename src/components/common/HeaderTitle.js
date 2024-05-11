import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderTitle = ({
  onLeftIconPress,
  leftIcon,
  headerTitle,
  onRightIconPress,
  rightIcon,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLeftIconPress}>
        <Ionicons name={leftIcon} size={24} color={'black'} />
      </TouchableOpacity>
      {headerTitle && <Text style={styles.headerTitle}>{headerTitle}</Text>}

      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress}>
          <Ionicons name={rightIcon} size={24} color={'black'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 17,
    color: 'black',
    fontWeight: '700',
  },
});
