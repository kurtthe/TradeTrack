import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  clientFriendly: false,
  products: [],
  restricted: false,
  headerTitle: 'Cart',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts: (state, {payload}) => {
      state.products = payload;
      state.restricted = payload.restricted ? payload.restricted : false;
    },
    getAllProductsSuccess: (state, {payload}) => {
      state.loading = false;
      state.allProducts = payload;
      state.restricted = payload.restricted ? payload.restricted : false;
    },
    clearProducts: state => {
      state.products = [];
    },
    changeClientFriendly: (state, {payload}) => {
      state.clientFriendly = payload;
      state.restricted = payload.restricted ? payload.restricted : false;
    },
    changeTitleHeader: (state, {payload}) => {
      state.headerTitle = payload;
    },
  },
});

export const {
  updateProducts,
  clearProducts,
  changeClientFriendly,
  changeTitleHeader,
} = productsSlice.actions;

export default productsSlice.reducer;
