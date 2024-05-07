import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './auth/reducers/login'
import liveBalanceReducer from './balance/liveBalance'
import invoicesReducer from './balance/invoices'
import newsReducer from './news/news'
import productsReducer from './cart/cart'
import statementsReducer from './statements/statements'
import ordersReducer from './orders/orders'
import preCartReducer from './cart/preCart'
import filterReducer from './filter/filter'
import placeOrderReducer from './placeOrders/placeOrders'

export const store = configureStore({
  reducer: {
    loginReducer,
    liveBalanceReducer,
    invoicesReducer,
    newsReducer,
    productsReducer,
    statementsReducer,
    ordersReducer,
    preCartReducer,
    filterReducer,
    placeOrderReducer,
  },
});
