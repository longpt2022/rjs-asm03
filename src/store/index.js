import { createSlice, configureStore } from '@reduxjs/toolkit';

// Tạo Slice popup
const initialPopupState = {
  isShow: false,
  data: {},
};

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

// Tạo Redux store
const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
  },
});

// Phương thức tạo actions
export const popupActions = popupSlice.actions;

export default store;
