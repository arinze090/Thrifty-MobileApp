import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useMutation} from '@apollo/client';
import Toast from 'react-native-toast-message';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import FormInput from '../../components/form/FormInput';
import {COLORS} from '../../theme/themes';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import FormButton from '../../components/form/FormButton';
import {CREATE_ITEM_TYPE} from '../../utils/graphql/gql-queries';
import verifyToken from '../../components/hoc/verifyUserToken';

const CreateItemTypeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  console.log('statttt', state);

  const reduxCategories = state.category.categories;

  console.log('reduxCategories', reduxCategories);

  const categoryPlaceholder = {
    label: 'Select a Category ...',
    value: null,
    color: '#ccc',
  };

  const subCatPlaceholder = {
    label: 'Select a Sub-Category Condition...',
    value: null,
    color: '#ccc',
  };
  const [name, setName] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [subCatID, setSubCatID] = useState('');

  //   console.log('categoryID', JSON?.parse(categoryID));
  console.log('subCatID', subCatID);

  // Error states
  const [formError, setFormError] = useState();

  const [nameError, setNameError] = useState('');
  const [categoryIDError, setCategoryIDError] = useState('');
  const [subCatIDError, setSubCatIDError] = useState('');

  // createItemType Mutation
  const [
    createItemTypeMutation,
    {
      data: createItemTypeMutationData,
      loading: createItemTypeMutationLoader,
      error: createItemTypeMutationError,
    },
  ] = useMutation(CREATE_ITEM_TYPE);

  const createItemType = () => {
    console.log('dhfhdh');
    const createItemTypeData = {
      name: name,
      categoryId: JSON.parse(categoryID)?.id,
      subCategoryId: JSON.parse(subCatID)?.id,
    };

    console.log('createItemTypeData', createItemTypeData);
    if (!name) {
      setNameError('Please provide a data here');
    } else if (!categoryID) {
      setCategoryIDError('Please select a category from the options');
    } else if (!subCatID) {
      setSubCatIDError('Please select a sub-category from the options');
    } else {
      try {
        createItemTypeMutation({
          variables: {inputData: createItemTypeData},
          onCompleted: async data => {
            console.log('createItemType dataaa', data);

            if (!data?.createItemType?.success) {
              setFormError(data?.createItemType?.message);
              Toast.show({
                type: 'thriftyToast',
                text2: 'Failed to create item type on Thrifty',
              });
            } else {
              // dispatch(getUser(data?.login));
              Toast.show({
                type: 'thriftyToast',
                text2: 'Great! Your Item Type has been added to Thrifty',
              });

              setName('');
              navigation.goBack();
            }
          },
          onError: error => {
            console.log('createItemType error', error);
            setFormError('An error occured, please try again later');
          },
        });
      } catch (error) {
        console.log('createItemType err 2', error);
        setFormError('An error occured, please try again later');
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <ScrollView>
        {/* Authentications */}

        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Name *</Text>
          <FormInput
            placeholder="Enter the name of the item"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            value={name}
            onChangeText={text => {
              setName(text);
              setNameError('');
            }}
            width={1.1}
          />
          {nameError ? (
            <Text style={styles.validationError}>{nameError}</Text>
          ) : null}
        </View>

        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Category *</Text>

          <RNPickerSelect
            style={pickerSelectStyles2}
            placeholder={categoryPlaceholder}
            onValueChange={cat => {
              setCategoryID(cat);
              setCategoryIDError('');
            }}
            items={reduxCategories?.map(cur => ({
              label: cur?.name,
              value: JSON?.stringify(cur),
            }))}
            Icon={() => {
              return (
                Platform.OS == 'ios' && (
                  <Ionicons
                    name="chevron-down-outline"
                    size={24}
                    color="#666"
                    style={{marginTop: 10, marginRight: 10}}
                  />
                )
              );
            }}
          />
          {categoryIDError ? (
            <Text style={styles.validationError}>{categoryIDError}</Text>
          ) : null}
        </View>

        {categoryID && JSON?.parse(categoryID)?.subcategories?.length && (
          <View style={styles.auth}>
            <Text style={styles.inputTitle}>Sub-Category *</Text>

            <RNPickerSelect
              style={pickerSelectStyles2}
              placeholder={subCatPlaceholder}
              onValueChange={cat => {
                setSubCatID(cat);
                setSubCatIDError('');
              }}
              items={JSON?.parse(categoryID)?.subcategories?.map(cur => ({
                label: cur?.name,
                value: JSON?.stringify(cur),
              }))}
              Icon={() => {
                return (
                  Platform.OS == 'ios' && (
                    <Ionicons
                      name="chevron-down-outline"
                      size={24}
                      color="#666"
                      style={{marginTop: 10, marginRight: 10}}
                    />
                  )
                );
              }}
            />
            {subCatIDError ? (
              <Text style={styles.validationError}>{subCatIDError}</Text>
            ) : null}
          </View>
        )}

        {/* Buttons */}
        <View style={{marginTop: 20}}>
          <Text style={styles.error}>{formError}</Text>
          <FormButton
            title={'Create Item'}
            onPress={createItemType}
            loading={createItemTypeMutationLoader}
            marginBottom={20}
          />
        </View>
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default CreateItemTypeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
  },
  auth: {
    width: windowWidth / 1.1,
    alignSelf: 'center',
    marginTop: 30,
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 15,
    color: COLORS.appTextColor,
    fontWeight: '700',
  },
  coverArtContainer: {
    width: windowWidth / 1.1,
    height: windowHeight / 4,
    // backgroundColor: 'red',
    marginLeft: 20,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // marginBottom: 20,
    marginTop: 20,
  },
  uploadContainer: {
    width: windowWidth / 1.1,
    height: windowHeight / 5,
    // backgroundColor: 'green',
    // marginLeft: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    marginBottom: 10,
  },
  cancelIcon: {
    position: 'absolute',
    zIndex: 999,
    opacity: 0.9,
    backgroundColor: 'black',
    right: 0,
    top: 0,
  },
  imageContainer: {
    width: windowWidth / 1.1,
    height: windowHeight / 5,
    // backgroundColor: 'green',
    // marginLeft: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    marginBottom: 10,
  },
  imageUpload: {
    width: windowWidth / 1.1,
    height: windowHeight / 5,
    // backgroundColor: 'green',
    // marginLeft: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  validationError: {
    color: 'red',
    fontWeight: '500',
    marginBottom: 15,
    fontSize: 13,
    // textAlign: 'center',
  },
  error: {
    color: 'red',
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: 7,
    fontSize: 13,
    // textAlign: 'center',
    // width: '90%',
  },
});

const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    borderRadius: 8,
    color: COLORS.appTextColor,
    paddingRight: 30, // to ensure the text is never behind the icon
    width: windowWidth / 1.3,
    height: windowHeight / 19,
    // backgroundColor: 'red',

    // width: 30,
    // height: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: COLORS.appTextColor,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  viewContainer: {
    borderWidth: 1,
    borderColor: '#333',
    width: windowWidth / 1.1,
    height: windowHeight / 17,
    color: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    // alignItems: 'center',
    // marginBottom: 30,
    marginTop: 0,
    backgroundColor: COLORS.appBackground,
    // width: 150,
    // height: 30,
  },
  pickerIcon: {
    marginTop: 30,
    marginRight: 90,
    backgroundColor: 'red',
  },
});
