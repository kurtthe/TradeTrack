import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientFriendly: false,
  products: [],
  restricted: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts: (state, { payload }) => {
      state.products = payload;
      state.restricted = payload.restricted;
    },
    getAllProductsSuccess: (state, { payload }) => {
      state.loading = false;
      state.allProducts = payload;
      state.restricted = payload.restricted;
    },
    clearProducts: (state) => {
      state.products = [];
      state.restricted = payload.restricted;
    },
    changeClientFriendly: (state, { payload }) => {
      state.clientFriendly = payload;
      state.restricted = payload.restricted;
    }
  },
});

export const { updateProducts, clearProducts, changeClientFriendly } = productsSlice.actions;

export default productsSlice.reducer;
