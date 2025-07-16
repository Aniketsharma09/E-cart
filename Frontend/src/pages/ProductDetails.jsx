import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncDeleteProduct } from "../store/productActions";
import { asyncUpdateUser } from "../store/userActions";
import Products from "./Products";
import UpdateProductForm from "../pages/admin/UpdateProductForm";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ProductDetails = () => {
  const products = useSelector((state) => state.productReducer.products);
  const users = useSelector((state) => state.userReducer.users);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (id && products.length) {
      const found = products.find((p) => p.id.toString() === id);
      setProduct(found || null);

      const alreadyInCart = users?.cart?.some(
        (c) => c?.product?.id.toString() === id
      );
      setIsInCart(alreadyInCart);
    }
  }, [id, products, users?.cart]);

  const deleteHandler = () => {
    dispatch(asyncDeleteProduct(id));
    toast.success("Product is Deleted successfully!");
    navigate("/");
  };

  const addToCartHandler = () => {
    if (isInCart) return;
    const copyUser = { ...users, cart: [...(users?.cart || [])] };
    copyUser.cart.push({ product: product, quantity: 1 });
    dispatch(asyncUpdateUser(copyUser, copyUser.id));
    toast.success("product is added to cart !");
    setIsInCart(true);
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,

  };

 const productSlider =  product?.images?.map((c, i) => (
              <div key = {i} className="h-full w-full">
                <img
                  className="h-[100%] w-[100%] object-cover"
                  src={c}
                  alt="product image"
                />
              </div>
            ))

  if (!product)
    return <div className="text-center text-2xl mt-10">Loading...</div>;

  return (
    <div className=" w-full h-fit overflow-auto flex flex-col">
      <div className="productDetail w-full h-[78vh] flex justify-between p-7">
        <div className="productImg w-[40%] h-[100%] px-3">
        <Slider {...settings} className="h-full w-full">
           {productSlider}
        </Slider>
        </div>

        <div className="productDet w-[57%] h-full pt-5 flex flex-col justify-between">
          <h3 className="text-xl capitalize text-[var(--text-p)]">
            {product.category}
          </h3>
          <h1 className="text-3xl capitalize text-[var(--text-h)]">
            {product.title}
          </h1>
          <div className="w-[25%] flex items-end justify-between">
            <h1 className="text-4xl capitalize text-[var(--text-h)] mt-6">
              ${product.price}
            </h1>
            <span className="ml-3 text-2xl line-through text-[var(--text-p)] mb-1">
              ${(product.price * 1.1).toFixed(2)}
            </span>
          </div>
          <h2 className="text-xl h-[40%] overflow-hidden text-[var(--text-p)] mt-4 text-justify">
            {product.description}
          </h2>
          <div className="h-[20%] flex items-center">
            <i className="ri-star-fill text-2xl text-yellow-400"></i>
            <i className="ri-star-fill text-2xl text-yellow-400"></i>
            <i className="ri-star-fill text-2xl text-yellow-400"></i>
            <i className="ri-star-fill text-2xl text-yellow-400"></i>
            <i className="ri-star-half-fill text-2xl text-yellow-400"></i>
            <h2 className="ml-3 text-[var(--text-p)] text-xl capitalize">
              4.5 Rating (11k review's)
            </h2>
          </div>
          <div className="w-full flex justify-between">
            <button
              onClick={addToCartHandler}
              disabled={isInCart}
              className={`w-[47%] rounded-xl text-xl py-3 
                hover:scale-99 active:scale-98 
                bg-[var(--btn)] text-[var(--text-h)]
                ${
                  isInCart ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
            >
              <i className="ri-shopping-cart-2-line"></i>{" "}
              {isInCart ? "Added to Cart" : "Add to Cart"}
            </button>
            <button className="w-[47%] rounded-xl text-xl py-3 hover:scale-99 active:scale-98 bg-[var(--btn)] text-[var(--text-h)]">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Admin product update form */}
      {users?.isAdmin && (
        <div className="productEditDivContainer p-5 w-[100%] h-fit">
          <button
            onClick={() => setshow(!show)}
            className="productEditBtn w-[100%] p-4 capitalize text-3xl bg-[var(--btn)] rounded-2xl font-bold tracking-widest hover:scale-99 active:scale-98 "
          >
            {show ? " close edit menu " : "edit product detail's"}
          </button>
          {show && (
            <UpdateProductForm
              product={product}
              productId={id}
              onDelete={deleteHandler}
            />
          )}
        </div>
      )}

      <Products />
    </div>
  );
};

export default ProductDetails;
