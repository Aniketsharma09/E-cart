import axios from "../api/axiosconfig";
import { loadProducts } from "./Reducers/productSlice";

export const asyncLoadProduct = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/products");
    dispatch(loadProducts(data));
  } catch (error) {
    console.log(error);
  }
};

export const asyncCreateProduct = (product) => async (dispatch) => {
  try {
    await axios.post("/products", product);
    dispatch(asyncLoadProduct());
  } catch (error) {
    console.log(error);
  }
};
export const asyncUpdateProduct = (id,product) => async (dispatch) => {
  try {
    await axios.patch("/products/"+id, product);
    dispatch(asyncLoadProduct());
  } catch (error) {
    console.log(error);
  }
};
export const asyncDeleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete("/products/"+id);
    dispatch(asyncLoadProduct());
  } catch (error) {
    console.log(error);
  }
};
