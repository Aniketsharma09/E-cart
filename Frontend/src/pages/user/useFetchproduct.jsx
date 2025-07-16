import React, { useState, useEffect } from "react";
import axios from "../../api/axiosconfig";
import { useDispatch, useSelector } from "react-redux";
import { loadLazyProduct } from "../../store/Reducers/productSlice";


const useFetchproduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const searchQuery = useSelector((state) => state.productReducer.searchQuery);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    if (loading) return;
    setLoading(true);
    try {
     const queryParam = searchQuery ? `&title_like=${searchQuery}` : "";
      const { data } = await axios.get(
        `/products?_limit=8&_start=${products.length}${queryParam}`
      );      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        dispatch(loadLazyProduct(data));
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  // initial load
  }, []);

  return { fetchProducts, hasMore };
};

export default useFetchproduct;
