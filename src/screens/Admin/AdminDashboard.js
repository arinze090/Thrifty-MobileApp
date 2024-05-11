import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import RevenueCards from '../../components/cards/RevenueCards';
import {COLORS} from '../../theme/themes';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import {useMutation} from '@apollo/client';
import {
  CREATE_CATEGORY,
  CREATE_ITEM_CONDITION,
} from '../../utils/graphql/gql-queries';
import FormInput from '../../components/form/FormInput';
import FormButton from '../../components/form/FormButton';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import verifyToken from '../../components/hoc/verifyUserToken';

const revenues = [
  {
    title: 'Sales',
    amount: 900000,
    iconName: 'trending-up-outline',
    backgroundColor: 'orange',
  },
  {
    title: 'Orders',
    amount: 40,
    iconName: 'pricetags-outline',
    backgroundColor: 'teal',
  },
  {
    title: 'Revenue',
    amount: 900000,
    iconName: 'cart-outline',
    backgroundColor: '#C088ef',
  },
  {
    title: 'Income',
    amount: 900000,
    iconName: 'wallet-outline',
    backgroundColor: '#228B22',
  },
];

const adminDashboard = [
  //   {
  //     iconName: 'cart-outline',
  //     name: 'Add Category',
  //     navigate: 'CreateCategoryScreen',
  //   },
  {
    iconName: 'barcode-outline',
    name: 'Add Brands',
    navigate: 'CreateBrandsScreen',
  },
  {
    iconName: 'medical-outline',
    name: 'Add Item Type',
    navigate: 'CreateItemTypeScreen',
  },
];
const AdminDashboard = ({navigation}) => {
  const categoryBottomSheetRef = useRef();
  const itemconditionBottomSheetRef = useRef();

  const [categoryName, setCategoryName] = useState('');
  const [itemConditionName, setItemConditionName] = useState('');
  const [itemConditionDescription, setItemConditionDescription] = useState('');

  // Error states
  const [formError, setFormError] = useState();

  const [categoryNameError, setCategoryNameError] = useState();
  const [itemConditionNameError, setItemConditionNameError] = useState('');
  const [itemConditionDescriptionError, setItemConditionDescriptionError] =
    useState('');

  // createBrand Mutation
  const [
    createCategoryMutation,
    {
      data: createCategoryMutationData,
      loading: createCategoryMutationLoader,
      error: createCategoryMutationError,
    },
  ] = useMutation(CREATE_CATEGORY);

  const createCategory = () => {
    console.log('dhfhdh');
    const createCategoryData = {
      name: categoryName,
    };

    console.log('createCategoryData', createCategoryData);
    if (!categoryName) {
      setCategoryNameError('Please provide a value');
    } else {
      try {
        createCategoryMutation({
          variables: createCategoryData,
          onCompleted: async data => {
            console.log('createBrand dataaa', data);

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

              categoryBottomSheetRef.current.close();
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

              itemconditionBottomSheetRef.current.close();
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

  const DisplayCategoryForm = () => {
    return (
      <KeyboardAvoidingView>
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
              }}
              width={1.2}
            />
            {categoryNameError ? (
              <Text style={styles.validationError}>{categoryNameError}</Text>
            ) : null}
          </View>

          <View style={{marginTop: 20}}>
            <FormButton
              loading={createCategoryMutationLoader}
              title={'Add Category'}
              onPress={() => {
                createCategory();
              }}
            />
          </View>
          <ScrollViewSpace />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  const DisplayItemConditionForm = () => {
    return (
      <KeyboardAvoidingView>
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
              width={1.2}
            />
            {itemConditionNameError ? (
              <Text style={styles.validationError}>
                {itemConditionNameError}
              </Text>
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
              width={1.2}
            />
            {itemConditionDescriptionError ? (
              <Text style={styles.validationError}>
                {itemConditionDescriptionError}
              </Text>
            ) : null}
          </View>

          <View style={{marginTop: 20}}>
            {formError && (
              <Text style={styles.validationError}>{formError}</Text>
            )}
            <FormButton
              loading={createItemConditionMutationLoader}
              title={'Add Item Condition'}
              onPress={() => {
                createItemCondition();
              }}
            />
          </View>
          <ScrollViewSpace />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            // backgroundColor: 'pink',
            height: windowHeight / 7,
            padding: 10,
          }}>
          {revenues?.map((cur, i) => (
            <RevenueCards key={i} props={cur} />
          ))}
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.set}
            onPress={() => {
              console.log('dhdhd');
              categoryBottomSheetRef.current.open();
            }}>
            <View style={styles.setsContent}>
              <Ionicons
                name="cart-outline"
                size={20}
                color={COLORS.appTextColor}
              />
              <Text style={styles.settingsText}>Add Category</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.appTextColor}
              style={{marginTop: 5}}
            />
          </TouchableOpacity>
          {adminDashboard?.map((cur, i) => (
            <TouchableOpacity
              key={i}
              style={styles.set}
              onPress={() => navigation.navigate(cur?.navigate)}>
              <View style={styles.setsContent}>
                <Ionicons
                  name={cur?.iconName}
                  size={20}
                  color={COLORS.appTextColor}
                />
                <Text style={styles.settingsText}>{cur?.name}</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={COLORS.appTextColor}
                style={{marginTop: 5}}
              />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.set}
            onPress={() => {
              console.log('dhdhd');
              itemconditionBottomSheetRef.current.open();
            }}>
            <View style={styles.setsContent}>
              <Ionicons
                name="medical-outline"
                size={20}
                color={COLORS.appTextColor}
              />
              <Text style={styles.settingsText}>Add Item Condition</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.appTextColor}
              style={{marginTop: 5}}
            />
          </TouchableOpacity>
        </View>

        {/* Category Bottomsheet */}
        <BottomSheet
          bottomSheetRef={categoryBottomSheetRef}
          bottomsheetTitle={'Add Category'}
          height={2}>
          <DisplayCategoryForm />
        </BottomSheet>

        {/* Item Condition Bottomsheet */}
        <BottomSheet
          bottomSheetRef={itemconditionBottomSheetRef}
          bottomsheetTitle={'Item Condition'}
          height={2}>
          <DisplayItemConditionForm />
        </BottomSheet>
      </ScrollView>
    </SafeAreaView>
  );
};

export default verifyToken(AdminDashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  activityCard: {
    width: windowWidth / 2,
    height: windowHeight / 9,
    borderRadius: 10,
    backgroundColor: 'green',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
  set: {
    // marginBottom: 8,
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
  },
  setsContent: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    margin: 5,
    // marginTop: 10,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.appTextColor,
    marginLeft: 17,
  },
  auth: {
    width: windowWidth / 1.2,
    alignSelf: 'center',
    marginTop: 20,
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 15,
    color: COLORS.appTextColor,
    fontWeight: '700',
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
