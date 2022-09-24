import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    job: null,
    notes: null,
    emailStore: null,
    nameStore: null,

    delivery_instructions: {
      delivery: null,
      location: null,
      date: null,
      time: null,
    },
  };

export const placeOrderSlice = createSlice({
  name: 'placeOrder',
  initialState,
  reducers: {
    setUpDelivery: (state, { payload }) => {
      state.delivery_instructions = {
        delivery: payload.delivery,
        location: payload.location,
        date: payload.date,
        time: payload.time
      };
    },
    setUpSection: (state, {payload}) => {
      state.sections[0].items = payload;
    },
    setDataStore: (state, {payload}) => {
      state.emailStore = payload.email
      state.nameStore = payload.name
      state.notes= payload.notes;

    },
    setUpOrder: (state, {payload}) => {
      state.name= payload.name;
      state.job= payload.job;
    },
    clear: (state)=> {
      state.name= null;
      state.job= null;
      state.emailStore= null;
      state.nameStore= null;
      state.notes= null;

      state.delivery_instructions = {
        delivery: null,
        location: null,
        date: null,
        time: null,
      };
    }
  },
})

export const { setUpDelivery,  setUpSection,  setUpOrder,  clear, setDataStore } = placeOrderSlice.actions

export default placeOrderSlice.reducer
