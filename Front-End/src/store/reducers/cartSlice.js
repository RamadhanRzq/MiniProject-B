import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCart: [],
};

const findCartItemIndex = (cartItems, newItem) => {
  return cartItems.findIndex((item) => item.id === newItem.id);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = findCartItemIndex(state.dataCart, newItem);

      if (existingItemIndex !== -1) {
        // Item sudah ada di keranjang, tambah qty
        state.dataCart = state.dataCart.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              qty: item.qty + newItem.qty,
            };
          }
          return item;
        });
      } else {
        // Item belum ada di keranjang, tambah item baru
        state.dataCart = [...state.dataCart, newItem];
      }
    },
    removeFromCart: (state, action) => {
      state.dataCart = state.dataCart.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
