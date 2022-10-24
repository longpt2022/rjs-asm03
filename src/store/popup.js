import { createSlice } from '@reduxjs/toolkit';

// Tạo state mặc định
const initialPopupState = {
  isShow: false,
  data: {},
};

// Tạo Slice popup
const popupSlice = createSlice({
  name: 'popup',
  initialState: initialPopupState,
  reducers: {
    SHOW_POPUP(state, action) {
      state.isShow = true;
      state.data = action.payload;
    },
    HIDE_POPUP(state) {
      state.isShow = false;
    },
  },
});

// Phương thức tạo actions
export const popupActions = popupSlice.actions;

export default popupSlice.reducer;
