import {
  Linking,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Button,
  ActivityIndicator,
  Alert,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import RBSheet from 'react-native-raw-bottom-sheet';
import Toast from 'react-native-toast-message';
import ImageView from 'react-native-image-viewing';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';

// Apollo
import {useLazyQuery, useQuery} from '@apollo/client';

// Redux data
import {useDispatch, useSelector} from 'react-redux';

import SocialShareButton from '../../components/form/SocialShareBtn';
import BuyNowBtn from '../../components/form/BuyNowBtn';
import TransparentOrderBtn from '../../components/form/TransparentOrderBtn';
import {
  checkForLikedItemsInRedux,
  setPriceTo2DecimalPlaces,
  timeAgo,
} from '../../Library/Common';
import {
  clearLikedItems,
  likeProductItem,
  unLikeProductItem,
} from '../../redux/features/user/userSlice';
import AvatarWithRandomColor from '../../components/common/AvatarWithRandomColor';

const DetailsScreen = ({navigation, route, destination}) => {
  const item = route.params;
  console.log('itemmm', item);

  const snapshotImages = item?.other_snapshots.map(url => ({uri: url}));
  console.log('snapshotImages', snapshotImages);

  const state = useSelector(state => state);
  console.log('state', state);

  const reduxLikedProducts = state.user.likedItems;
  console.log('reduxLikedProducts', reduxLikedProducts);
  const dispatch = useDispatch();

  const socailMediaBottomSheet = useRef();

  const [loading, setloading] = useState(false);
  const [visible, setIsVisible] = useState(false);

  const onLoadEnd = () => {
    setloading(true);
  };

  const checkIfProductIsLiked = checkForLikedItemsInRedux(
    reduxLikedProducts,
    item.id,
  );

  const toggleLikeProduct = () => {
    checkIfProductIsLiked
      ? dispatch(unLikeProductItem(item.id))
      : dispatch(likeProductItem(item));

    // dispatch(clearLikedItems());
  };

  console.log('checkIfProductIsLiked', checkIfProductIsLiked);

  return (
    <View style={styles.container}>
      {/* Carousel Section */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginBottom: 10,
          // backgroundColor: 'green',
          height: windowHeight,
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}>
          <ImageBackground
            style={styles.detailsImage}
            source={{uri: item?.cover_image}}
            onLoad={onLoadEnd}
            onLoadEnd={onLoadEnd}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 40,
                padding: 10,
              }}>
              <TouchableOpacity
                style={{marginBottom: 10}}
                onPress={() => navigation.navigate('HomeScreen')}>
                <Ionicons
                  name="arrow-back-outline"
                  size={25}
                  color={COLORS.appTextColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
              //   onPress={RNShare(Share, shouttyMessage, shouttyCelebUrl)}
              // onPress={() => socailMediaBottomSheet.current.open()}
              >
                <Ionicons name="" size={25} color={COLORS.appTextColor} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {!loading && (
          <SkeletonPlaceholder
            highlightColor={COLORS.skeletonHighlightColor}
            backgroundColor={COLORS.skeletonBgColor}
            speed={1900}>
            <Image style={styles.detailsImage} source={''} />
          </SkeletonPlaceholder>
        )}

        <ImageView
          images={snapshotImages}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false} style={{padding: 15}}>
        {/* Seller Section */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            marginBottom: 20,
          }}>
          {item?.owner?.image ? (
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 5}}>
              <Image
                source={{uri: item?.cover_image}}
                style={styles.sellerIcon}
              />
              <Text style={styles.seller}>{item?.owner?.firstname}</Text>
            </View>
          ) : (
            <AvatarWithRandomColor firstName={item?.owner?.firstname} />
          )}
        </View>

        {/* Product info Section */}
        <View
          style={{
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          }}>
          <Text style={{color: COLORS.appTextColor, marginBottom: 5}}>
            {item.name}
          </Text>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={{color: COLORS.appTextColor}}>
              {item.brand.name} - {item.condition.name}{' '}
            </Text>
          </View>
          <Text style={{color: COLORS.appTextColor, marginBottom: 10}}>
            {setPriceTo2DecimalPlaces(item?.price)}
          </Text>
        </View>

        <View style={styles.reviewSection}>
          <TouchableOpacity style={styles.review} onPress={toggleLikeProduct}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                name={checkIfProductIsLiked ? 'heart' : 'heart-outline'}
                size={15}
                color={checkIfProductIsLiked ? COLORS.pinky : COLORS.pinky}
                style={{marginRight: 5}}
              />
              <Text style={styles.reviewText}>Save For Later</Text>
            </View>
          </TouchableOpacity>
          <View style={{borderRightColor: '#666', borderWidth: 1}} />
          <TouchableOpacity
            style={styles.review}
            onPress={() => socailMediaBottomSheet.current.open()}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                name="share-outline"
                color="#fff"
                size={15}
                style={{marginRight: 5}}
              />

              <Text style={styles.reviewText}>Share</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={[styles.summaryA, {fontSize: 13}]}>
            {item?.description}
          </Text>
          {item?.brand && (
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Brand</Text>
              <Text style={styles.summaryA}>{item?.brand?.name}</Text>
            </View>
          )}
          {item?.color && (
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Color</Text>
              <Text style={styles.summaryA}>{item?.color}</Text>
            </View>
          )}
          {item?.brand && (
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Condition</Text>
              <Text style={styles.summaryA}>{item?.condition?.name}</Text>
            </View>
          )}
          {item?.size && (
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Size</Text>
              <Text style={styles.summaryA}>{item?.size}</Text>
            </View>
          )}
          {item?.quantity_in_stock && (
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Quantity in stock</Text>
              <Text style={styles.summaryA}>{item?.quantity_in_stock}</Text>
            </View>
          )}
          {item?.createdAt && (
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Uploaded</Text>
              <Text style={styles.summaryA}>{timeAgo(item?.createdAt)}</Text>
            </View>
          )}
        </View>

        <View style={[styles.section, {marginTop: 50, minHeight: 200}]} />
      </ScrollView>

      {/* BuyNow Button */}
      <View style={styles.btnSection}>
        <TransparentOrderBtn title={'Bargain'} disabled={true} />
        <BuyNowBtn
          title={'Buy Now'}
          onPress={() => {
            navigation.navigate('PaymentScreen', item);
          }}
        />
      </View>

      {/* Social media BottomSheet */}
      <RBSheet
        ref={socailMediaBottomSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={windowHeight / 4}
        render
        customStyles={{
          wrapper: {
            backgroundColor: '#000000b3',
          },
          draggableIcon: {
            backgroundColor: '#ccc',
          },
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: 'black',
          },
        }}>
        <View style={{padding: 10}}>
          <Text
            style={{
              color: '#ccc',
              textAlign: 'center',
              fontSize: 17,
              fontWeight: '700',
            }}>
            Share Product
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {/* Social Buttons */}
            <View style={styles.logoSection}>
              <SocialShareButton name="copy-outline" color="white" />
              <SocialShareButton name="logo-twitter" color="white" />
              <SocialShareButton name="logo-facebook" color="white" />
              <SocialShareButton name="logo-instagram" color="white" />
              <SocialShareButton name="logo-whatsapp" color="white" />
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    height: windowHeight,
    backgroundColor: COLORS.appBackground,
    // paddingTop: windowHeight / 19,
  },
  orderAction: {
    backgroundColor: '#212121',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 7,
    height: windowHeight / 11,
    padding: 20,
    borderWidth: 1,
    marginBottom: 10,
  },
  activeService: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: COLORS.pinky,
  },
  icon: {
    flexDirection: 'row',
  },
  iconText: {
    marginLeft: 10,
  },
  shoutoutPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
    color: COLORS.appTextColor,
  },
  shoutoutText: {
    width: windowWidth / 1.7,
    color: COLORS.appTextColor,
    marginBottom: 10,
  },
  bookNow: {
    backgroundColor: COLORS.appTextColor,
    padding: 10,
    margin: 9,
    width: windowWidth / 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  bookNowText: {
    color: 'black',
    fontWeight: '700',
  },
  bookNowSection: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.appTextColor,
  },
  info: {
    color: '#ccc',
    marginTop: 3,
    fontSize: 14,
    fontWeight: '400',
  },
  about: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    marginBottom: 20,
    // width: '93%',
  },
  detailsImage: {
    height: windowHeight / 1.8,
    width: windowWidth,
    borderRadius: 10,
    // marginRight: 10,
    // backgroundColor: 'red',
  },
  deliveryText: {
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: COLORS.appTextColor,
    padding: 2,
    fontSize: 10,
    fontWeight: '900',
  },
  serviceDeliveryText: {
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: COLORS.appTextColor,
    padding: 2,
    fontSize: 10,
    //fontWeight: '900',
  },
  deliveryContainer: {
    backgroundColor: '#212121',
    width: windowWidth / 4,
    borderRadius: 4,
    marginBottom: 20,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight / 29,
  },
  serviceDelivery: {
    //backgroundColor: '#333',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    //padding: 15,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 5,
  },
  btnSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: windowHeight / 5,
    // height: windowHeight / 15,
    position: 'absolute',
    padding: 15,
    bottom: 25,
    width: windowWidth,
    // backgroundColor: '#212121', // COLORS.btnBorderColor,
    // backgroundColor: '#18191a',
    // position: 'absolute',
    borderRadius: 60,
  },
  bookBtn: {
    backgroundColor: COLORS.pinky,
    borderRadius: 6,
    width: windowWidth / 1.8,
    alignSelf: 'center',
    alignItems: 'center',
    height: windowHeight / 19,
    justifyContent: 'center',
  },
  btnText: {
    color: COLORS.appTextColor,
    fontSize: 15,
    fontWeight: '700',
  },
  reviewSection: {
    flexDirection: 'row',
    backgroundColor: '#212121',
    justifyContent: 'space-between',
    padding: 10,
    // borderRadius: 10,
    marginBottom: 20,
    paddingTop: 20,
    marginTop: 10,
  },
  review: {
    width: '50%',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  reviewText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  learnMore: {
    fontSize: 12,
    color: COLORS.pinky,
    fontWeight: '500',
    marginTop: 10,
    // fontStyle: 'italic',
  },
  servicesTitle: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: '900',
    marginBottom: 5,
  },
  servicesTitle2: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '900',
    marginBottom: 10,
  },
  cancelBtn: {
    backgroundColor: 'black',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    width: 30,
    height: 30,
    alignContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  br: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.pinky,
    marginRight: 10,
  },
  reviewTitle: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  ratingSection: {
    justifyContent: 'space-between',
    // alignItems: 'flex-end',
    // alignContents: 'flex-end',
    display: 'flex',
    // alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  SQ: {
    marginTop: 10,
    marginBottom: 20,
  },
  Q: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: windowHeight / 15,
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  summaryQ: {
    color: COLORS.appTextColor,
    // fontWeight: '500',
    fontSize: 16,
    // backgroundColor: 'red',
    // width: windowWidth / 1.3,
    // marginBottom: 10,
  },
  summaryA: {
    color: COLORS.appTextColor,
    // fontWeight: '500',
    fontSize: 14,
  },
  breaker: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  checkServiceInOccassion: {
    color: '#ccc',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  moneyBack: {
    padding: 10,
    backgroundColor: '#111',
    borderRadius: 10,
    marginBottom: 10,
  },
  moneyBackText: {
    color: '#ccc',
    fontWeight: '500',
    fontSize: 14,
    // textAlign: 'center',
    // marginBottom: 10,
  },
  logoSection: {
    flexDirection: 'row',
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
