import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncUpdateUser } from "../../store/userActions";

const ProductsLoader = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.userReducer);
  const copyUser = { ...users, cart: [...(users?.cart || [])] };
  const isInCart = copyUser?.cart?.some((c) => c?.product?.id === product.id);

  const addToCartHandler = (product, id) => {
    const idx = copyUser?.cart?.findIndex((c) => c?.product?.id === id);
    if (idx === -1) {
      copyUser.cart.push({ product, quantity: 1 });
    } else {
      copyUser.cart[idx] = {
        ...copyUser.cart[idx],
        quantity: copyUser.cart[idx].quantity + 1,
      };
    }
    dispatch(asyncUpdateUser(copyUser, copyUser.id));
  };
  const productDetailOpener = () => {
    navigate(`/products/details/${product.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      key={product.id}
      onClick={productDetailOpener}
      className="productCart flex-shrink-0 w-68 h-90 rounded-2xl overflow-hidden flex flex-col justify-between hover:cursor-pointer"
    >
      <div className="imgContainer w-full h-[80%]">
        <img
          className="h-[75%] rounded-2xl w-full object-cover"
          src={product.images[0]}
          alt=""
        />
        <h2 className="productHeading text-xl p-2 capitalize tracking-wide text-[var(--text-h)]">
          {product.title.slice(0, 40)}
        </h2>
      </div>
      <div className="productCartDetail h-[20%] p-2 flex items-center justify-between">
        <h3 className="productPrice text-[var(--text-h)] text-2xl">
          $ {product.price}
        </h3>
        <button
          disabled={isInCart}
          onClick={(e) => {
            e.stopPropagation();
            addToCartHandler(product, product.id);
          }}
          className={`flex items-center justify-center cartBtn text-sm px-3 py-2 rounded-md gap-2 transition-all ${
            isInCart
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "hover:cursor-pointer hover:scale-99 active:scale-98 text-[var(--cart)] bg-[var(--btn)]"
          }`}
        >
          {/* ✅ MOBILE ICONS (Separate for each state) */}
          {!isInCart ? (
            <i className="ri-shopping-cart-line md:hidden"></i>
          ) : (
            <i className="ri-check-line md:hidden"></i>
          )}

          {/* 🖥️ DESKTOP TEXT */}
          <span className="hidden md:inline">
            {isInCart ? "Added to cart" : "Add to cart"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductsLoader;
