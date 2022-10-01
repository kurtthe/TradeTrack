import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  statements:[],
  restricted: false
}

export const statementsSlice = createSlice({
  name: 'statements',
  initialState,
  reducers: {
    getStatements: (state, action) => {
      state.statements = action.payload;
      state.restricted = action.payload.restricted ? action.payload.restricted : false;
    },
  },
})

export const { getStatements } = statementsSlice.actions

export default statementsSlice.reducer
