import axios from "../api/axiosconfig";
import { loadusers, removeUser } from "./Reducers/userSlice";

export const asyncGetCurrentUser = () => (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(loadusers(user));
    else console.log("User Not login !");
  } catch (error) {
    console.log(error);
  }
};
export const asyncLogoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeUser());
  } catch (error) {
    console.log(error);
  }
};
export const asyncLoginUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );
    localStorage.setItem("user", JSON.stringify(data[0]));
    dispatch(loadusers(data[0]));
  } catch (error) {
    console.log(error);
  }
};
export const asyncRegisterUser = (user) => async () => {
  try {
    await axios.post("/users", user);
  } catch (error) {
    console.log(error);
  }
};
export const asyncUpdateUser = (user, id) => async (dispatch) => {
  try {
    const { data } = await axios.patch("/users/" + id, user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(loadusers(data));
  } catch (error) {
    console.log(error);
  }
};
export const asyncDeleteUser = (id) => async (dispatch) => {
  try {
     await axios.delete("/users/" + id);
    dispatch(asyncLogoutUser());
  } catch (error) {
    console.log(error);
  }
};
