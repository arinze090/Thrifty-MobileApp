// features/user/userSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: null,
  token: null,
  error: null,
  userToken: null,
  registerUser: null,
  progress: null,
  isUploading: false,
  path: {},
  likedItems: [],
  userBalances: null,
  tnxHistory: null,
  userDeliveryAddress: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    registerUser: (state, action) => {
      state.registerUser = action.payload;
    },
    signOutUser: (state, action) => {
      state.user = null;
      state.userToken = null;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      console.log('userToken', state.userToken);
    },
    likeProductItem: (state, action) => {
      state.likedItems = [...state.likedItems, action.payload];
    },
    unLikeProductItem: (state, action) => {
      console.log('acccc', action.payload);
      const updatedLikedItems = state.likedItems.filter(
        item => item.id !== action.payload,
      );

      state.likedItems = updatedLikedItems;
    },

    clearLikedItems: (state, action) => {
      state.likedItems = [];
    },
    updateThrifty: (state, action) => {
      let currentState = {...state.user};
      currentState.user.orders_as_buyer =
        currentState?.user?.orders_as_buyer || [];
      currentState.user.orders_as_buyer.push(action.payload);
      state.user = currentState;
    },
    updateUserOrders: (state, action) => {
      let userState = {...state.user};
      userState.user.orders_as_buyer = userState?.user?.orders_as_buyer || [];
      userState.user.orders_as_buyer = action.payload;
      state.user = userState;
    },
    updateSellerOrders: (state, action) => {
      let sellerState = {...state.user};
      sellerState.user.orders_as_seller =
        sellerState?.user?.orders_as_seller || [];
      sellerState.user.orders_as_seller = action.payload;
      state.user = sellerState;
    },
    setTnxHistory: (state, action) => {
      state.tnxHistory = action.payload;
    },
    setUserBalances: (state, action) => {
      state.userBalances = action.payload;
    },
    setUserDeliveryAddress: (state, action) => {
      state.userDeliveryAddress = action.payload;
    },
    setUploadProgress: (state, action) => {
      state.progress = action.payload;
    },
    setIsUploading: (state, action) => {
      state.isUploading = action.payload;
    },
    setUploadFilePath: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const {
  getUser,
  signOutUser,
  registerUser,
  setUserToken,
  likeProductItem,
  unLikeProductItem,
  clearLikedItems,
  updateThrifty,
  updateUserOrders,
  updateSellerOrders,
  setTnxHistory,
  setUserBalances,
  setUserDeliveryAddress,
  setUploadProgress,
  setIsUploading,
  setUploadFilePath,
} = userSlice.actions;
export default userSlice.reducer;
