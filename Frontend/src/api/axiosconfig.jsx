import axios from "axios";

const instance = axios.create({
  baseURL: "https://e-cart-production.up.railway.app/api",
});
export default instance;
