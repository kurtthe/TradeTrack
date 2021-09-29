import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allProducts: [],
    products: [],
    loading: false,
    error: '',
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts: (state) => {
            state.loading = true
        },
        getProductsSuccess: (state, { payload }) => {
            state.loading = false
            state.products = payload
        },
        getProductsFail: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        updateProducts: (state, {payload}) => {
            state.products = payload
        },
        getAllProductsSuccess:  (state, { payload }) => {
            state.loading = false
            state.allProducts = payload
        }
    },
})

export const { getProducts, getProductsSuccess, getProductsFail, updateProducts, getAllProductsSuccess } = productsSlice.actions

export default productsSlice.reducer
