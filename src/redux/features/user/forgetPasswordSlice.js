// features/user/userSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  forgetPassword: null,
  verifyCode: null,
};

const forgetPasswordSlice = createSlice({
  name: 'forgetPassword',
  initialState: initialState,
  reducers: {
    getForgetPassword: (state, action) => {
      state.forgetPassword = action.payload;
    },
    getVerifyCode: (state, action) => {
      state.verifyCode = action.payload;
    },
  },
});

export const {getForgetPassword, getVerifyCode} = forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer;
