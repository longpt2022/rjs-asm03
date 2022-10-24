import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popup';
import productsReducer from './products';

// Tạo Redux store
const store = configureStore({
  reducer: {
    popup: popupReducer,
    products: productsReducer,
  },
});

export default store;
