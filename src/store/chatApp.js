import { createSlice } from '@reduxjs/toolkit';

// Tạo state mặc định
const initialChatAppState = {
  dataMess: [],
};

// Tạo Slice chatApp
const chatAppSlice = createSlice({
  name: 'chatApp',
  initialState: initialChatAppState,
  reducers: {
    ADD_CUSTOMER_MESS(state, action) {
      state.dataMess = [...state.dataMess, action.payload];
    },
    ADD_ADMIN_MESS(state, action) {
      state.dataMess = [...state.dataMess, action.payload];
    },
  },
});

// Phương thức tạo actions
export const chatAppActions = chatAppSlice.actions;

export default chatAppSlice.reducer;
