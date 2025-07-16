import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts :[],
}
const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        lodadcart : (state, action) => {
            state.carts = action.payload;
        }
    }
})
export default cartSlice.reducer;
export const {lodadcart} = cartSlice.actions;