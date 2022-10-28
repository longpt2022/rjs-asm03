import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popup';
import productsReducer from './products';
import authReducer from './auth';
import cartReducer from './cart';

// Tạo Redux store
const store = configureStore({
  reducer: {
    popup: popupReducer,
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
