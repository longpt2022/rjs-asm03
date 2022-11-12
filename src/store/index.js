import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popup';
import productsReducer from './products';
import authReducer from './auth';
import cartReducer from './cart';
import checkoutReducer from './checkout';
import chatAppReducer from './chatApp';
import toastReducer from './toast';

// Tạo Redux store
const store = configureStore({
  reducer: {
    popup: popupReducer,
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    chatApp: chatAppReducer,
    toast: toastReducer,
  },
});

export default store;
