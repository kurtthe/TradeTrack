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
    restricted: false
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
        time: payload.time,
        restricted: payload.restricted ? payload.restricted : false,
        contact_number: payload.contact_number,
        contact_name: payload.contact_name
      };
    },
    setUpSection: (state, {payload}) => {
      state.sections[0].items = payload;
      state.restricted = payload.restricted ? payload.restricted : false;
    },
    setDataStore: (state, {payload}) => {
      state.emailStore = payload.email
      state.nameStore = payload.name
      state.notes= payload.notes;
      state.restricted = payload.restricted ? payload.restricted : false;

    },
    setUpOrder: (state, {payload}) => {
      state.name= payload.name;
      state.job= payload.job;
      state.restricted = payload.restricted ? payload.restricted : false;
    },
    clear: (state)=> {
      state.name= null;
      state.job= null;
      state.emailStore= null;
      state.nameStore= null;
      state.notes= null;
      state.restricted = false;

      state.delivery_instructions = {
        delivery: null,
        location: null,
        date: null,
        time: null,
        contact_number: null,
        contact_name: null,
      };
    }
  },
})

export const { setUpDelivery,  setUpSection,  setUpOrder,  clear, setDataStore } = placeOrderSlice.actions

export default placeOrderSlice.reducer
