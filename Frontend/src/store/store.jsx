import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Reducers/userSlice.jsx';
import productReducer from './Reducers/productSlice.jsx';
import cartReducer from './Reducers/cartSlice.jsx';
export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    productReducer: productReducer,
    cartReducer: cartReducer,
  },
});
