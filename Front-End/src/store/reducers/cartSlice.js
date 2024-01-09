import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCart: [],
};

const findCartItemIndex = (cartItems, newItem) => {
  return cartItems.findIndex((item) => item.id === newItem.id);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    dataCart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = findCartItemIndex(state.dataCart, newItem);

      if (existingItemIndex !== -1) {
        state.dataCart = state.dataCart.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: (item.quantity || 1) + (newItem.quantity || 1),
            };
          }
          return item;
        });
      } else {
        state.dataCart = [
          ...state.dataCart,
          { ...newItem, quantity: newItem.quantity || 1 },
        ];
      }
    },
    removeFromCart: (state, action) => {
      state.dataCart = state.dataCart.filter(
        (item) => item.id !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const itemToUpdate = state.dataCart.find((item) => item.id === itemId);
      if (itemToUpdate) {
        itemToUpdate.quantity = parseInt(newQuantity);
      }
    },
    clearCart: (state) => {
      state.dataCart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
