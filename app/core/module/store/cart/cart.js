import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    }
  },
});

export const { updateProducts, clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
