import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  searchQuery: "",
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload;
    },
    loadLazyProduct: (state, action) => {
      state.products = [...state.products, ...action.payload];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});
export default productSlice.reducer;
export const { loadProducts, loadLazyProduct, setSearchQuery } =
  productSlice.actions;
