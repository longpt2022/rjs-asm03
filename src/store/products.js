import { createSlice } from '@reduxjs/toolkit';

// Tạo state mặc định
const initialProductsState = {
  url: 'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74',
  data: [],
};

// Tạo Slice products
const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    SET_PRODUCTS(state, action) {
      state.data = action.payload;
    },
  },
});

// Phương thức tạo actions
export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
