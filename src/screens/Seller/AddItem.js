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
import ImagePicker from 'react-native-image-crop-picker';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {useSelector} from 'react-redux';
import FormInput from '../../components/form/FormInput';
import {COLORS} from '../../theme/themes';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import FormButton from '../../components/form/FormButton';
import {ADD_ITEM} from '../../utils/graphql/gql-queries';
import verifyToken from '../../components/hoc/verifyUserToken';

const AddItem = () => {
  const placeholder = {
    label: 'Select a Brand...',
    value: null,
    color: '#ccc',
  };

  const conditionPlaceholder = {
    label: 'Select a Item Condition...',
    value: null,
    color: '#ccc',
  };

  const itemTypePlaceholder = {
    label: 'Select a Item Condition...',
    value: null,
    color: '#ccc',
  };

  const state = useSelector(state => state);
  console.log('statttt', state);

  const reduxBrands = state?.category?.brands;
  const reduxConditions = state?.category?.itemConditions;

  console.log('reduxBrands', reduxBrands);
  let otherSnapshots = [];

  const [brands, setBrands] = useState('');
  const [color, setColor] = useState();
  const [condition, setCondition] = useState();
  const [coverImage, setCoverImage] = useState();
  const [description, setDescription] = useState();
  const [itemType, setItemType] = useState();
  const [name, setName] = useState();
  // const [otherSnapshots, setOtherSnapshots] = useState([]);
  const [price, setPrice] = useState();
  const [quantityInStock, setQuantityInStock] = useState();
  const [size, setSize] = useState();

  console.log('condition', condition);
  console.log('coverImage', coverImage);
  console.log('brands', brands);
  console.log('otherSnapshots', otherSnapshots);

  // Error states
  const [formError, setFormError] = useState();

  const [brandsError, setBrandsError] = useState();
  const [colorError, setColorError] = useState();
  const [conditionError, setConditionError] = useState();
  const [coverImageError, setCoverImageError] = useState();
  const [descriptionError, setDescriptionError] = useState();
  const [itemTypeError, setItemTypeError] = useState();
  const [nameError, setNameError] = useState();
  const [otherSnapshotsError, setOtherSnapshotsError] = useState();
  const [priceError, setPriceError] = useState();
  const [quantityInStockError, setQuantityInStockError] = useState();
  const [sizeError, setSizeError] = useState();

  const openGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: 'photo',
      multiple: true,
    }).then(res => {
      console.log('image', res);
      setCoverImageError('');
      setCoverImage(res[0]?.path);

      res.map(cur => otherSnapshots.push(cur.path));
    });
  };

  // addItem Mutation
  const [
    addItemMutation,
    {data: addItemData, loading: addItemLoader, error: addItemMutationError},
  ] = useMutation(ADD_ITEM);

  const addItem = () => {
    console.log('dhfhdh');
    const addItmeData = {
      brand: brands,
      color: color,
      condition: condition,
      cover_image: coverImage,
      description: description,
      item_type: '64f51e5f3ac4c33b5f52dd4b',
      name: name,
      other_snapshots: otherSnapshots,
      price: price,
      quantity_in_stock: quantityInStock,
      size: size,
    };

    console.log('addItmeData', addItmeData);
    if (!coverImage) {
      setCoverImageError('Please add an image');
    } else if (!name) {
      setNameError('Please write a name for your item here');
    } else if (!description) {
      setDescriptionError('Please write a description for your item here');
    } else if (!price) {
      setPriceError('Please write the price for your item here');
    } else if (!quantityInStock) {
      setQuantityInStockError(
        'Please write the number of qauntity in stock for your item here',
      );
    } else if (!condition) {
      setConditionError('Please what is the condition of your item here');
    } else {
      try {
        addItemMutation({
          variables: {inputData: addItemData},
          onCompleted: async data => {
            console.log('addItem dataaa', data);

            if (!data?.addItem?.success) {
              setFormError(data?.addItem?.message);
              Toast.show({
                type: 'thriftyToast',
                text2: 'Failed to upload your item to Thrifty',
              });
            } else {
              // dispatch(getUser(data?.login));
              Toast.show({
                type: 'thriftyToast',
                text2: 'Great! Your item has been added to our store',
              });
            }
          },
          onError: error => {
            console.log('addItem error', error);
          },
        });
      } catch (error) {
        console.log('addItemMutation err 2', error);
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <ScrollView>
        {/* Authentications */}
        <View style={styles.coverArtContainer}>
          <Text style={styles.inputTitle}>Cover Image *</Text>
          {!coverImage ? (
            <TouchableOpacity
              style={styles.uploadContainer}
              onPress={openGallery}>
              <Ionicons name="cloud-upload-outline" color="black" size={30} />
              <Text>Select a image for your cover image </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.imageContainer}>
              <Image source={{uri: coverImage}} style={styles.imageUpload} />
              <Ionicons
                onPress={() => {
                  setCoverImage(null);
                }}
                name="close-outline"
                size={30}
                color="white"
                style={styles.cancelIcon}
              />
            </View>
          )}
          {coverImageError ? (
            <Text style={styles.validationError}>{coverImageError}</Text>
          ) : null}
        </View>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Title *</Text>
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
          <Text style={styles.inputTitle}>Description *</Text>
          <FormInput
            placeholder="Enter the item description of the item"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            textContentType="default"
            value={description}
            onChangeText={text => {
              setDescription(text);
              setDescriptionError('');
            }}
            width={1.1}
            // maxLength={30}
            multiline={true}
            height={10}
          />
          {descriptionError ? (
            <Text style={styles.validationError}>{descriptionError}</Text>
          ) : null}
        </View>

        {reduxConditions && (
          <View style={styles.auth}>
            <Text style={styles.inputTitle}>Condition *</Text>

            <RNPickerSelect
              style={pickerSelectStyles2}
              placeholder={conditionPlaceholder}
              onValueChange={cat => {
                setCondition(cat);
                setConditionError('');
              }}
              items={reduxConditions?.map(cur => ({
                label: cur?.name,
                value: cur?.id,
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
            {conditionError ? (
              <Text style={styles.validationError}>{conditionError}</Text>
            ) : null}
          </View>
        )}
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Price *</Text>
          <FormInput
            placeholder="Enter the price of the item"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="phone-pad"
            value={price}
            onChangeText={text => {
              setPrice(text);
              setPriceError('');
            }}
            width={1.1}
          />
          {priceError ? (
            <Text style={styles.validationError}>{priceError}</Text>
          ) : null}
        </View>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Quantity In Stock *</Text>
          <FormInput
            placeholder="Enter the quantity in stock of the item"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="phone-pad"
            value={quantityInStock}
            onChangeText={text => {
              setQuantityInStock(text);
              setQuantityInStockError('');
            }}
            width={1.1}
          />
          {quantityInStockError ? (
            <Text style={styles.validationError}>{quantityInStockError}</Text>
          ) : null}
        </View>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Color</Text>
          <FormInput
            placeholder="Enter the color of the item"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            value={color}
            onChangeText={text => {
              setColor(text);
              setColorError('');
            }}
            width={1.1}
          />
          {colorError ? (
            <Text style={styles.validationError}>{colorError}</Text>
          ) : null}
        </View>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Size</Text>
          <FormInput
            placeholder="Enter the size of the item"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            value={size}
            onChangeText={text => {
              setSize(text);
              setSizeError('');
            }}
            width={1.1}
          />
          {sizeError ? (
            <Text style={styles.validationError}>{sizeError}</Text>
          ) : null}
        </View>
        {reduxBrands && (
          <View style={styles.auth}>
            <Text style={styles.inputTitle}>Brand</Text>

            <RNPickerSelect
              style={pickerSelectStyles2}
              placeholder={placeholder}
              onValueChange={cat => {
                setBrands(cat);
                setBrandsError('');
              }}
              items={reduxBrands?.map(brand => ({
                label: brand?.name,
                value: brand?.id,
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
            {brandsError ? (
              <Text style={styles.validationError}>{brandsError}</Text>
            ) : null}
          </View>
        )}

        {/* Buttons */}
        <View style={{marginTop: 20}}>
          <Text style={styles.error}>{formError}</Text>
          <FormButton
            title={'Add Item'}
            onPress={addItem}
            loading={addItemLoader}
            // disabled={password?.length < 6 || !emailValidator(email)}
            marginBottom={20}
          />
        </View>
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default verifyToken(AddItem);

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
