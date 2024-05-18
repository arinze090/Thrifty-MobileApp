import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import {CREATE_CATEGORY} from '../../utils/graphql/gql-queries';

import {RNToast} from '../../Library/Common';
import ThriftyPins from '../../components/common/ThriftyPins';
import HeaderTitle from '../../components/common/HeaderTitle';

const AddCategoryScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const reduxCategories = state?.category?.categories;
  console.log('reduxCategories', reduxCategories);

  const [categoryName, setCategoryName] = useState('');

  // Error states
  const [formError, setFormError] = useState();
  const [categoryNameError, setCategoryNameError] = useState();

  // createCategory Mutation
  const [
    createCategoryMutation,
    {
      data: createCategoryMutationData,
      loading: createCategoryMutationLoader,
      error: createCategoryMutationError,
    },
  ] = useMutation(CREATE_CATEGORY);

  const createCategory = () => {
    const createCategoryData = {
      name: categoryName,
    };

    console.log('createCategoryData', createCategoryData);
    if (!categoryName) {
      setCategoryNameError('Please provide a category name');
    } else {
      try {
        createCategoryMutation({
          variables: createCategoryData,
          onCompleted: async data => {
            console.log('createCategory dataaa', data);

            if (!data?.createCategory?.success) {
              setFormError(data?.createCategory?.message);
              Toast.show({
                type: 'thriftyToast',
                text2: 'Failed to create category on Thrifty',
              });
            } else {
              // dispatch(getUser(data?.login));
              Toast.show({
                type: 'thriftyToast',
                text2: 'Great! Your category has been added to Thrifty',
              });
              navigation?.goBack();
            }
          },
          onError: error => {
            console.log('createCategory error', error);
            setFormError('An error occured, please try again later');
          },
        });
      } catch (error) {
        console.log('createCategoryMutation err 2', error);
        setFormError('An error occured, please try again later');
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation?.goBack();
        }}
        headerTitle={'Add Category'}
        rightIcon={'menu-outline'}
        onRightIconPress={() => {
          navigation.openDrawer();
        }}
      />
      <View style={{margin: 20}}>
        <Text style={styles.brandsOnThrifty}>
          Previous Categories on Thrifty
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.customSwitch}>
          {reduxCategories?.map((cur, i) => (
            <ThriftyPins key={i} optionTitle={cur?.name} />
          ))}
        </ScrollView>
      </View>
      <ScrollView>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Category Name</Text>
          <FormInput
            placeholder="Enter Category Name"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            value={categoryName}
            onChangeText={text => {
              setCategoryName(text);
              setFormError('');
              setCategoryNameError('');
            }}
            width={1.1}
          />
          {categoryNameError ? (
            <Text style={styles.validationError}>{categoryNameError}</Text>
          ) : null}
        </View>

        {/* Buttons */}
        <View style={{marginTop: 20}}>
          <Text style={styles.error}>{formError}</Text>
          <FormButton
            title={'Create Category'}
            onPress={createCategory}
            loading={createCategoryMutationLoader}
            marginBottom={20}
          />
        </View>
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default AddCategoryScreen;

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
  brandsOnThrifty: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
});
