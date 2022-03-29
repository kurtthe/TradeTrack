import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientFriendly: false,
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts: (state, { payload }) => {
      state.products = payload;
    },
    getAllProductsSuccess: (state, { payload }) => {
      state.loading = false;
      state.allProducts = payload;
    },
    clearProducts: (state) => {
      state.products = [];
    },
    changeClientFriendly: (state, { payload }) => {
      state.clientFriendly = payload
    }
  },
});

export const { updateProducts, clearProducts, changeClientFriendly } = productsSlice.actions;

export default productsSlice.reducer;
