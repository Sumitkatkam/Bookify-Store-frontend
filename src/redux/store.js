import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './features/cart/CartSlice';
import booksApi from './features/bookapi/booksApi';
import OrdersApi from './features/orderapi/OrdersApi';


export const store = configureStore({
  reducer: {
    cart: CartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [OrdersApi.reducerPath]: OrdersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, OrdersApi.middleware),
})