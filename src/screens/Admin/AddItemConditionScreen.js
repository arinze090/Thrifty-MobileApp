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
import {CREATE_ITEM_CONDITION} from '../../utils/graphql/gql-queries';
import verifyToken from '../../components/hoc/verifyUserToken';

import {RNToast} from '../../Library/Common';
import ThriftyPins from '../../components/common/ThriftyPins';
import HeaderTitle from '../../components/common/HeaderTitle';

const AddItemConditionScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const reduxItemConditions = state?.category?.itemConditions;
  console.log('reduxItemConditions', reduxItemConditions);

  const [itemConditionName, setItemConditionName] = useState('');
  const [itemConditionDescription, setItemConditionDescription] = useState('');

  // Error states
  const [formError, setFormError] = useState();
  const [itemConditionNameError, setItemConditionNameError] = useState('');
  const [itemConditionDescriptionError, setItemConditionDescriptionError] =
    useState('');

  const [
    createItemConditionMutation,
    {
      data: createItemConditionMutationData,
      loading: createItemConditionMutationLoader,
      error: createItemConditionMutationError,
    },
  ] = useMutation(CREATE_ITEM_CONDITION);

  const createItemCondition = () => {
    console.log('dhfhdh');
    const createItemConditionData = {
      name: itemConditionName,
    };

    console.log('createItemConditionData', createItemConditionData);
    if (!itemConditionName) {
      setCategoryNameError('Please provide a value');
    } else {
      try {
        createItemConditionMutation({
          variables: createItemConditionData,
          onCompleted: async data => {
            console.log('createItemCondition dataaa', data);

            if (!data?.createItemCondition?.success) {
              setFormError(data?.createItemCondition?.message);
              Toast.show({
                type: 'thriftyToast',
                text2: 'Failed to create item condition on Thrifty',
              });
            } else {
              // dispatch(getUser(data?.login));
              Toast.show({
                type: 'thriftyToast',
                text2: 'Great! Your condition has been added to Thrifty',
              });
            }
          },
          onError: error => {
            console.log('createItemCondition error', error);
            setFormError('An error occured, please try again later');
          },
        });
      } catch (error) {
        console.log('createItemCondition err 2', error);
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
        headerTitle={'Add Item Condition'}
        rightIcon={'menu-outline'}
      />
      <View style={{margin: 20}}>
        <Text style={styles.brandsOnThrifty}>
          Previous Item Conditions on Thrifty
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.customSwitch}>
          {reduxItemConditions?.map((cur, i) => (
            <ThriftyPins key={i} optionTitle={cur?.name} />
          ))}
        </ScrollView>
      </View>
      <ScrollView>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Name</Text>
          <FormInput
            placeholder="Enter Name"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            value={itemConditionName}
            onChangeText={text => {
              setItemConditionName(text);
              setFormError('');
            }}
            width={1.1}
          />
          {itemConditionNameError ? (
            <Text style={styles.validationError}>{itemConditionNameError}</Text>
          ) : null}
        </View>

        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Description</Text>
          <FormInput
            placeholder="Enter description"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            value={itemConditionDescription}
            onChangeText={text => {
              setItemConditionDescription(text);
              setFormError('');
            }}
            width={1.1}
          />
          {itemConditionDescriptionError ? (
            <Text style={styles.validationError}>
              {itemConditionDescriptionError}
            </Text>
          ) : null}
        </View>

        {/* Buttons */}
        <View style={{marginTop: 20}}>
          <Text style={styles.error}>{formError}</Text>
          <FormButton
            title={'Create Item Condition'}
            onPress={createItemCondition}
            loading={createItemConditionMutationLoader}
            marginBottom={20}
          />
        </View>
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default AddItemConditionScreen;

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
