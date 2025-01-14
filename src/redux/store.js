import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './features/cart/CartSlice';
import booksApi from './features/bookapi/booksApi';
import ordersApi from './features/orderapi/ordersApi';


export const store = configureStore({
  reducer: {
    cart: CartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
})