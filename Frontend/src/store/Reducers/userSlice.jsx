import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadusers: (state, action) => {
      state.users = action.payload;
    },
    removeUser: (state) => {
      state.users = [];
    },
  },
});
export default userSlice.reducer;
export const { loadusers, removeUser } = userSlice.actions;
