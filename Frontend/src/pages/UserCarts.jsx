import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncUpdateUser } from "../store/userActions";
import { useEffect, useState } from "react";

const UserCarts = () => {
  const { users } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [localCart, setLocalCart] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Update local cart when redux user changes
  useEffect(() => {
    if (users && users.cart) {
      setLocalCart(users.cart);
    }
  }, [users]);

  const navigateHandler = () => {
    navigate("/");
  };

  const updateCartInRedux = async (updatedCart) => {
    if (isUpdating) return; // Prevent multiple simultaneous updates
    
    setIsUpdating(true);
    try {
      const updatedUser = { ...users, cart: updatedCart };
      await dispatch(asyncUpdateUser(updatedUser, updatedUser.id));
      console.log("Cart updated successfully");
    } catch (error) {
      console.error("Failed to update cart:", error);
      // Revert local cart on error
      setLocalCart(users.cart || []);
    } finally {
      setIsUpdating(false);
    }
  };

  const increaseQuantityHandler = async (product, id) => {
    const updatedCart = [...localCart];
    const idx = updatedCart.findIndex((c) => c.product.id === id);

    if (idx === -1) {
      updatedCart.push({ product, quantity: 1 });
    } else {
      updatedCart[idx] = {
        ...updatedCart[idx],
        quantity: updatedCart[idx].quantity + 1,
      };
    }

    setLocalCart(updatedCart); // update UI immediately
    await updateCartInRedux(updatedCart); // update redux
  };

  const decreaseQuantityHandler = async (product, id) => {
    const updatedCart = [...localCart];
    const idx = updatedCart.findIndex((c) => c.product.id === id);

    if (idx === -1) return;

    if (updatedCart[idx].quantity > 1) {
      updatedCart[idx] = {
        ...updatedCart[idx],
        quantity: updatedCart[idx].quantity - 1,
      };
    } else {
      updatedCart.splice(idx, 1); // remove product if quantity is 1
    }

    setLocalCart(updatedCart);
    await updateCartInRedux(updatedCart);
  };

  let totalAmount = 0;
  const renderCarts = localCart.map(
    (c) => (
      (totalAmount += c.product.price * c.quantity),
      (
        <div
          className="userCartContainer z-10 flex items-center justify-between mt-5"
          key={c.product.id}
        >
          <div className="productInfor w-[40%] flex p-1">
            <img
              className="w-30 h-30 rounded-xl"
              src={c.product.images[0]}
              alt={c.product.title}
            />
            <div className="productHeading ml-8 p-3 flex flex-col justify-between">
              <h1 className="text-[var(--text-h)] capitalize">
                {c.product.title}
              </h1>
              <h2 className="text-[var(--text-p)] capitalize pb-2">
                {c.product.category}
              </h2>
            </div>
          </div>

          <div className="productPrice w-[18%] flex items-center justify-center">
            <h1 className="text-[var(--text-h)]">$ {c.product.price}</h1>
          </div>

          <div className="ProductIncDec w-[24%] flex items-center justify-center gap-5">
            <button
              onClick={() => decreaseQuantityHandler(c.product, c.product.id)}
              disabled={isUpdating}
              className={`cursor-pointer text-3xl hover:scale-103 active:scale-100 text-[var(--text-h)] ${
                isUpdating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              -
            </button>
            <h1 className="text-[var(--text-h)]">{c.quantity}</h1>
            <button
              onClick={() => increaseQuantityHandler(c.product, c.product.id)}
              disabled={isUpdating}
              className={`cursor-pointer text-2xl hover:scale-103 active:scale-100 text-[var(--text-h)] ${
                isUpdating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              +
            </button>
          </div>

          <div className="productTotalPrice w-[18%] flex items-center justify-center">
            <h1 className="text-[var(--text-h)]">
              $ {(c.product.price * c.quantity).toFixed(2)}
            </h1>
          </div>
        </div>
      )
    )
  );

  return (
    <div className="userCartMainDiv w-full h-[90vh] p-7">
      <div className="userCartTopDiv flex items-center justify-between">
        <h1 className="text-5xl text-[var(--text-h)] tracking-widest font-extrabold">
          My Cart
        </h1>
        <button
          onClick={navigateHandler}
          className="cursor-pointer px-3 py-3 flex gap-2 items-center justify-center bg-[var(--nav)] rounded-md hover:scale-99 active:scale-98"
        >
          <i className="text-xl text-[var(--text-p)] ri-arrow-left-double-line"></i>
          <h2 className="text-md text-[var(--text-p)]">Continue shopping</h2>
        </button>
      </div>

      <div className="userCartHeadings flex items-center justify-between mt-10">
        <div className="fristDiv w-[40%] text-md capitalize text-[var(--text-p)] text-center">
          product
        </div>
        <div className="remanDiv w-[18%] text-md capitalize text-[var(--text-p)] text-center">
          price
        </div>
        <div className="remanDiv w-[24%] text-md capitalize text-[var(--text-p)] text-center">
          qty
        </div>
        <div className="remanDiv w-[18%] text-md capitalize text-[var(--text-p)] text-center">
          total
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full mt-5">
        {localCart.length > 0 ? (
          renderCarts
        ) : (
          <h2 className="text-center text-2xl text-[var(--text-p)] mt-10">
            Your cart is empty
          </h2>
        )}
      </div>
      {totalAmount == 0 ? (
        ""
      ) : (
        <div className="userCartInfo w-[95%] h-[12%] bg-[var(--text-p)] fixed bottom-5 left-8 rounded-2xl flex items-center justify-around">
          <div className="fristproductDiv w-[20%] h-full flex flex-col items-center justify-center">
            <h1 className="text-xl">Total Amount</h1>
            <h2 className="text-xl line-through">$ {totalAmount.toFixed(2)}</h2>
          </div>
          <div className="remanproductDiv w-[20%] h-full flex flex-col items-center justify-center">
            <h1 className="text-xl">Discount</h1>
            <h2 className="text-xl">10%</h2>
          </div>
          <div className="remanproductDiv w-[20%] h-full flex flex-col items-center justify-center">
            <h1 className="text-xl">Final Amount</h1>
            <h2 className="text-xl">
              $ {(totalAmount - totalAmount / 10).toFixed(2)}
            </h2>
          </div>
          <button className="remanproductDiv w-[25%] p-3 bg-[var(--btn)] text-2xl rounded-xl hover:scale-99 active:scale-98 cursor-pointer ">
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCarts;