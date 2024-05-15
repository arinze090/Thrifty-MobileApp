import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';
import FormButton from '../form/FormButton';

const CategorySearchBar = props => {
  return (
    <View style={styles.container}>
      <View
        style={
          !props?.clicked
            ? styles.searchBar__unclicked
            : styles.searchBar__clicked
        }
        // onPress={Keyboard.dismiss}
      >
        {/* search Icon */}
        <Ionicons
          name="search-outline"
          size={20}
          //   backgroundColor="#000"
          color={COLORS.appTextColor}
          onPress={props?.onPressIn}
        />

        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search for items ..."
          value={props.searchPhrase}
          onChangeText={props?.setSearchPhrase}
          placeholderTextColor={COLORS.appTextColor}
          focusable={true}
          onFocus={() => {
            props?.setClicked(true);
          }}
          onPressIn={props?.onPressIn}
          autoFocus={props?.autoFocus}
          onPress={props?.onPress}
          //   clearTextOnFocus={true}
        />

        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {props?.clicked && (
          <Ionicons
            name="close-outline"
            size={20}
            color="red"
            style={{padding: 1}}
            onPress={() => {
              props?.setSearchPhrase('');
            }}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {props?.clicked && (
        <View>
          <FormButton
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              props?.setClicked(false);
              props?.setSearchPhrase('');
            }}
            width={6}
          />
        </View>
      )}
    </View>
  );
};

export default CategorySearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: windowWidth - 10,
    marginBottom: 10,
    marginTop: 10,
    // marginBottom: 10,
  },
  searchBar__unclicked: {
    padding: 7,
    flexDirection: 'row',
    width: '97%',
    backgroundColor: COLORS.appBackground,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: '90%',
    color: COLORS.appTextColor,
  },
});
