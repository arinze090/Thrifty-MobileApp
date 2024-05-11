import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  main: '#1974BA',
  black: '#000000',
  white: '#FFFFFF',
  pinky: '#F50157',
  purple: '#8E24AA',

  thriftyColor: '#008080',

  // App colors
  splashBg: '#000000',
  splashBlack: '#000000',
  appBackground: '#fff',
  appTextColor: 'black',
  formTextColor: '#E9D800',
  appBlack: '#000917',

  // Form button colors
  formActionBtn: '#000000',
  formSecondaryBtn: '#FFFFFF',
  formSecondaryBtnText: '#000000',
  formButton: '#B60044',
  borderBottomColor: '#ccc',

  // Text Colors
  descriptionText: '#5E5E5E',
  formSecondaryBtnBorderColor: '#000000',
  formActionBtnText: '#FFFFFF',

  primary: '#1974BA',
  whitesmoke: 'whitesmoke',

  transparent: 'transparent',

  btnBorderColor: '#333',
  btnBorderColor2: '#666',

  optionBorderColor: '#333',
  skeletonBgColor: '#000',
  skeletonHighlightColor: '#242323',

  success: '#6FCF97',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 10,
  padding: 14,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 18,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {fontFamily: 'Poppins-Black', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: SIZES.h4,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  h5: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h5, lineHeight: 22},
  body1: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
