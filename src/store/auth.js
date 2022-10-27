import { createSlice } from '@reduxjs/toolkit';

// Lấy ra currentUser từ localStorage
const dataGetStorage = localStorage.getItem('currentUser');
let currentUserLocal = dataGetStorage ? JSON.parse(dataGetStorage) : null;

// Giá trị mặng địng của auth state
const initialAuthState = {
  currentUser: currentUserLocal,
  isAuthenticated: !!currentUserLocal,
};

console.log(initialAuthState);

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    ON_LOGIN(state, action) {
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
  },
});

// Phương thức tạo actions
export const authActions = authSlice.actions;

export default authSlice.reducer;
