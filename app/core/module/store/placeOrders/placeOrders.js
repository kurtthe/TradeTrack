import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    supplier: null,
    job: null,
    issued_on: null,
    notes: null,
    tax_exclusive: true,
    emailStore: null,
    nameStore: null,
    sections: [
      {
        items: [],
        hide_section: false,
        hide_section_price: false,
        hide_section_items: false,
        hide_item_qty: false,
        hide_item_price: false,
        hide_item_subtotal: false,
        hide_item_total: false,
      },
    ],
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
    },
    setUpOrder: (state, {payload}) => {
      state.name= payload.name;
      state.supplier= payload.supplier;
      state.job= payload.job;
      state.issued_on= payload.issued_on;
      state.notes= payload.notes;
      state.tax_exclusive= payload.tax_exclusive;
    },
    clear: (state)=> {
      state.name= null;
      state.supplier= null;
      state.job= null;
      state.issued_on= null;
      state.emailStore= null;
      state.nameStore= null;
      state.notes= null;
      state.tax_exclusive= true;
      state.sections= [
        {
          items: [],
          hide_section: false,
          hide_section_price: false,
          hide_section_items: false,
          hide_item_qty: false,
          hide_item_price: false,
          hide_item_subtotal: false,
          hide_item_total: false,
        },
      ];
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
