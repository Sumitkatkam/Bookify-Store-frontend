import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './features/cart/CartSlice';
import booksApi from './features/bookapi/booksApi';
import orderApi from './features/orderapi/orderApi';

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, orderApi.middleware),
})