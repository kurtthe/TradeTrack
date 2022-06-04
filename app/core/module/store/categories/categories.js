import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listCategories: [],
  listSubCategories: []
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.listCategories = action.payload
    },
    getSubCategories: (state, action) => {
      state.listSubCategories = action.payload
    }
  }
})

export const {
  getCategories,
  getSubCategories
} = categoriesSlice.actions

export default categoriesSlice.reducer
