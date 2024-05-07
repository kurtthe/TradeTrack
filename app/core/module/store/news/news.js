import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  news:[]
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    getNews: (state, action) => {
      state.news = action.payload;
    },
  },
})

export const { getNews } = newsSlice.actions

export default newsSlice.reducer
