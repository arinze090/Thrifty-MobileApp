import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  loading: false,
  error: null,
  searchResults: [],
  userCategories: [],
  brands: null,
  itemConditions: null,
  itemTypes: null,
  thriftyItems: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload?.categories;
      console.log('redux categories', state.categories);
    },
    userPreferenceCategories: (state, action) => {
      state.userCategories = action.payload;
      console.log('user preferenced categories', state.userCategories);
    },
    categoriesFetchLoading: (state, action) => {
      state.loading = action.payload;
    },
    getBrands: (state, action) => {
      state.brands = action.payload;
    },
    getItemConditions: (state, action) => {
      state.itemConditions = action.payload;
    },
    getItemTypes: (state, action) => {
      state.itemTypes = action.payload;
    },
    setThriftyItems: (state, action) => {
      state.thriftyItems = action.payload;
    },
  },
});

export const {
  getCategories,
  userPreferenceCategories,
  categoriesFetchLoading,
  getBrands,
  getItemConditions,
  getItemTypes,
  setThriftyItems,
} = categorySlice.actions;
export default categorySlice.reducer;
