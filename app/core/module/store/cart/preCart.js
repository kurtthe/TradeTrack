import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const preCart = createSlice({
  name: 'preCart',
  initialState,
  reducers: {
    updatePreOrder: (state, { payload }) => {
      state.products = payload;
    },
  },
});

export const { updatePreOrder } = preCart.actions;

export default preCart.reducer;
