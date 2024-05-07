import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  company_id: null,
  updated: null,
  current: 0,
  thirty_day: null,
  overdue: 0,
  total: null,
  client_number: null,
  company: null,
  restricted: false,
}

export const liveBalanceSlice = createSlice({
  name: 'getBalance',
  initialState,
  reducers: {
    getBalance: (state, action) => {
      const data = action.payload?.body;
      const nameCompany = action.payload?.headers['tradetrak-company']

      state.id = data.id
      state.company_id = data.company_id
      state.updated = data.updated
      state.current = data.current
      state.thirty_day = data.thirty_day
      state.overdue = data.overdue
      state.total = data.total
      state.client_number = data.client_number
      state.company = nameCompany
      state.restricted = data.restricted
    },
  },
})

export const { getBalance } = liveBalanceSlice.actions

export default liveBalanceSlice.reducer
