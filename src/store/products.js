import { createSlice } from '@reduxjs/toolkit';

// Tạo state mặc định
const initialProductsState = {
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
