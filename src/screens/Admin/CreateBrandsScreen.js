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
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useMutation} from '@apollo/client';
import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {Cloudinary} from '@cloudinary/url-gen';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import FormInput from '../../components/form/FormInput';
import {COLORS} from '../../theme/themes';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import FormButton from '../../components/form/FormButton';
import {ADD_ITEM, CREATE_BRAND} from '../../utils/graphql/gql-queries';
import verifyToken from '../../components/hoc/verifyUserToken';
import {uploadToCloudinary} from '../../services/ImageUpload';
import axiosInstance from '../../utils/cloudinaryUpload';
import {
  setIsUploading,
  setUploadProgress,
} from '../../redux/features/user/userSlice';
import {RNToast} from '../../Library/Common';
import ThriftyPins from '../../components/common/ThriftyPins';
import dummy from '../../data/dummyData';

const CreateBrandsScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const reduxBrands = state?.category?.brands;
  console.log('reduxBrands', reduxBrands);

  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [abbrevation, setAbbrevation] = useState('');
  const [coverImage, setCoverImage] = useState();
  const [uploadedImageData, setUploadedImageData] = useState();
  console.log('uploadedImageData', uploadedImageData);

  // Error states
  const [formError, setFormError] = useState();

  const [brandNameError, setBrandNameError] = useState();
  const [descriptionError, setDescriptionError] = useState('');
  const [abbrevationError, setAbbrevationError] = useState('');
  const [coverImageError, setCoverImageError] = useState();

  const openGallery = async () => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: 'photo',
      multiple: false,
    }).then(res => {
      console.log('image', res);
      setCoverImageError('');
      setCoverImage(res?.sourceURL);

      uploadToCloudinary(
        res?.sourceURL,
        res?.filename,
        res?.mime,
        axios,
        RNToast,
        Toast,
        setUploadedImageData,
      );
    });
  };

  // createBrand Mutation
  const [
    createBrandMutation,
    {
      data: createBrandMutationData,
      loading: createBrandLoader,
      error: createBrandMutationError,
    },
  ] = useMutation(CREATE_BRAND);

  const createBrand = () => {
    console.log('dhfhdh');
    const createBrandData = {
      name: brandName,
      logo: uploadedImageData?.secure_url,
      description: description,
      abbreviation: abbrevation,
    };

    console.log('createBrandData', createBrandData);
    if (!coverImage) {
      setCoverImageError('Please upload an image');
    } else if (!brandName) {
      setBrandNameError('Please fill the brand name');
    } else if (!description) {
      setDescriptionError('Please write a description for your brand here');
    } else {
      try {
        createBrandMutation({
          variables: {inputData: createBrandData},
          onCompleted: async data => {
            console.log('createBrand dataaa', data);

            if (!data?.createBrand?.success) {
              setFormError(data?.createBrand?.message);
              Toast.show({
                type: 'thriftyToast',
                text2: 'Failed to create brand on Thrifty',
              });
            } else {
              // dispatch(getUser(data?.login));
              Toast.show({
                type: 'thriftyToast',
                text2: 'Great! Your brand has been added to Thrifty',
              });
              setCoverImage(null);
              setUploadedImageData(null);
              setBrandName('');
              setDescription('');
              navigation.goBack();
            }
          },
          onError: error => {
            console.log('createBrand error', error);
            setFormError('An error occured, please try again later');
          },
        });
      } catch (error) {
        console.log('createBrandMutation err 2', error);
        setFormError('An error occured, please try again later');
      }
    }
  };
  return (
    <SafeAreaViewComponent>
      <View style={{margin: 20}}>
        <Text style={styles.brandsOnThrifty}>Brands on Thrifty</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.customSwitch}>
          {reduxBrands?.map((cur, i) => (
            <ThriftyPins key={i} optionTitle={cur?.name} />
          ))}
        </ScrollView>
      </View>
      <ScrollView>
        {/* Authentications */}
        <View style={styles.coverArtContainer}>
          <Text style={styles.inputTitle}>Brand Logo *</Text>
          {!coverImage ? (
            <TouchableOpacity
              style={styles.uploadContainer}
              onPress={openGallery}>
              <Ionicons name="cloud-upload-outline" color="black" size={30} />
              <Text>Select a image for your brand </Text>
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
          <Text style={styles.inputTitle}>Brand Name *</Text>
          <FormInput
            placeholder="Enter the name of the brand"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="default"
            value={brandName}
            onChangeText={text => {
              setBrandName(text);
              setBrandNameError('');
            }}
            width={1.1}
          />
          {brandNameError ? (
            <Text style={styles.validationError}>{brandNameError}</Text>
          ) : null}
        </View>
        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Description</Text>
          <FormInput
            placeholder="Enter the description of the brand"
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

        <View style={styles.auth}>
          <Text style={styles.inputTitle}>Abbreviation</Text>
          <FormInput
            placeholder="Enter the brand's abbreviation"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="numeric"
            value={abbrevation}
            onChangeText={text => {
              setAbbrevation(text);
              setAbbrevationError('');
            }}
            width={1.1}
          />
          {abbrevationError ? (
            <Text style={styles.validationError}>{abbrevationError}</Text>
          ) : null}
        </View>

        {/* Buttons */}
        <View style={{marginTop: 20}}>
          <Text style={styles.error}>{formError}</Text>
          <FormButton
            title={'Create Brand'}
            onPress={createBrand}
            loading={createBrandLoader}
            // disabled={password?.length < 6 || !emailValidator(email)}
            marginBottom={20}
          />
        </View>
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default CreateBrandsScreen;

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
