import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  company_id: null,
  updated: null,
  current:null,
  thirty_day: null,
  overdue: null,
  total: null
}

export const liveBalanceSlice = createSlice({
  name: 'getBalance',
  initialState,
  reducers: {
    getBalance: (state, action) => {
      const data = action.payload;
      state.id = data.id
      state.company_id = data.company_id
      state.updated = data.updated
      state.current = data.current
      state.thirty_day = data.thirty_day
      state.overdue = data.overdue
      state.total = data.total
    },
  },
})

export const { getBalance } = liveBalanceSlice.actions

export default liveBalanceSlice.reducer
