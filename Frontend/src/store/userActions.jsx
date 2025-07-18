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
    console.log("Updating user:", { user, id });
    
    // Method 1: Try PUT first (Railway sometimes prefers PUT over PATCH)
    let response;
    try {
      response = await axios.put("/users/" + id, user);
      console.log("PUT successful:", response.data);
    } catch (putError) {
      console.log("PUT failed, trying PATCH:", putError.message);
      
      // Method 2: Fallback to PATCH with proper headers
      response = await axios.patch("/users/" + id, user, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log("PATCH successful:", response.data);
    }
    
    // Update localStorage and Redux
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch(loadusers(response.data));
    
    return response.data;
  } catch (error) {
    console.error("Update user failed:", error);
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    throw error;
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

// Alternative update function if the above doesn't work
export const asyncUpdateUserAlternative = (user, id) => async (dispatch) => {
  try {
    // First get the current user
    const currentUserResponse = await axios.get("/users/" + id);
    const currentUser = currentUserResponse.data;
    
    // Merge the changes
    const updatedUser = { ...currentUser, ...user };
    
    // Use PUT to replace the entire user object
    const { data } = await axios.put("/users/" + id, updatedUser);
    
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(loadusers(data));
    
    return data;
  } catch (error) {
    console.error("Alternative update failed:", error);
    throw error;
  }
};