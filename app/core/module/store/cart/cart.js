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
  },
});

export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;
