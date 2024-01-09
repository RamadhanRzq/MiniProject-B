import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducers/cartSlice";
import checkoutSlice from "./reducers/checkoutSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    checkout: checkoutSlice,
  },
});

export default store;