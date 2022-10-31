import { createSlice } from '@reduxjs/toolkit';

// Lấy ra currentUser từ localStorage
const dataGetStorage = localStorage.getItem('currentUser');
// Xử lý data nhận về
let currentUserLocal = dataGetStorage ? JSON.parse(dataGetStorage) : {};

// Hàm check null currentUserLocal
const isCurrentUser = Object.keys(currentUserLocal).length !== 0 ? true : false;

// Giá trị mặc định của auth state
const initialAuthState = {
  currentUser: currentUserLocal,
  isAuthenticated: !!isCurrentUser,
};

// console.log(initialAuthState);

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    ON_LOGIN(state, action) {
      // Lưu lại state
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      // Lưu current user vào local
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    ON_LOGOUT(state) {
      // Lưu lại state
      state.currentUser = {};
      state.isAuthenticated = false;
      // Xóa current user khỏi local
      localStorage.removeItem('currentUser');
    },
    SET_CURRENT_USER(state, action) {
      // Lưu lại state
      state.currentUser = action.payload;
      // Lưu current user vào local
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
  },
});

// Phương thức tạo actions
export const authActions = authSlice.actions;

export default authSlice.reducer;
