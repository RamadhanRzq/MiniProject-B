import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCart: [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    dataCart: [],
  },
  reducers: {
    clearCart: (state) => {
      state.dataCart = [];
    },
  },
});

export const { clearCart } = checkoutSlice.actions;

export default checkoutSlice.reducer;