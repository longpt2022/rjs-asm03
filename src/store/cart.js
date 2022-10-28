import { createSlice } from '@reduxjs/toolkit';

// Lấy ra listCart từ localStorage
const dataGetStorage = localStorage.getItem('listCart');
// Xử lý data nhận về
let listCartLocal = dataGetStorage && JSON.parse(dataGetStorage).listCart;
let totalQuantityLocal =
  dataGetStorage && JSON.parse(dataGetStorage).totalQuantity;

// initial State cart
const initialCartState = {
  listCart: listCartLocal || [],
  totalQuantity: totalQuantityLocal || 0,
};

// console.log(initialCartState);

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    ADD_CART(state, action) {
      const updatedTotalQuantity =
        state.totalQuantity + action.payload.price * +action.payload.quantity;

      // Tìm id trùng với id payload
      const existingCartItemIndex = state.listCart.findIndex(
        item => item._id.$oid === action.payload._id.$oid
      );
      const existingCartItem = state.listCart[existingCartItemIndex];

      // Gộp số lượng sản phẩm nếu trùng nhau
      let updatedListCart;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: +existingCartItem.quantity + +action.payload.quantity,
        };
        updatedListCart = [...state.listCart];
        updatedListCart[existingCartItemIndex] = updatedItem;
      } else {
        updatedListCart = state.listCart.concat(action.payload);
      }

      // Giá trị trả về sau khi add
      state.listCart = updatedListCart;
      state.totalQuantity = updatedTotalQuantity;
      // lưu lại vào localStorage
      localStorage.setItem(
        'listCart',
        JSON.stringify({
          listCart: updatedListCart,
          totalQuantity: updatedTotalQuantity,
        })
      );
    },
    UPDATE_CART(state, action) {
      // logic tương tự add
      // action.payload.quantity = -1 nếu muốn giảm
      // action.payload.quantity = +1 nếu muốn tăng

      const updatedTotalQuantity =
        state.totalQuantity + action.payload.price * +action.payload.quantity;

      // Tìm id trùng với id payload
      const existingCartItemIndex = state.listCart.findIndex(
        item => item._id.$oid === action.payload._id.$oid
      );
      const existingCartItem = state.listCart[existingCartItemIndex];

      // Gộp số lượng sản phẩm nếu trùng nhau
      let updatedListCart;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: +existingCartItem.quantity + +action.payload.quantity,
        };
        updatedListCart = [...state.listCart];
        updatedListCart[existingCartItemIndex] = updatedItem;
      } else {
        updatedListCart = state.listCart.concat(action.payload);
      }

      // Giá trị trả về sau khi update
      state.listCart = updatedListCart;
      state.totalQuantity = updatedTotalQuantity;
      // lưu lại vào localStorage
      localStorage.setItem(
        'listCart',
        JSON.stringify({
          listCart: updatedListCart,
          totalQuantity: updatedTotalQuantity,
        })
      );
    },
    DELETE_CART(state, action) {},
  },
});

// Phương thức tạo actions
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
