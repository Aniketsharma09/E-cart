import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setSearchQuery } from "../store/Reducers/productSlice.jsx";
import MobileNav from "./MobileNav.jsx";
const Nav = () => {
  const user = useSelector((state) => state.userReducer.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchHandler = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  return (
    <nav className="nav w-full  text-[var(--nav-t)] flex items-center justify-between p-2">
      <div className="navLogo w-[15%] flex items-center justify-center gap-3  ">
        <i className="text-4xl ri-shopping-cart-2-line"></i>
        <h1 className="text-3xl font-fascinate">E-Cart</h1>
      </div>
      <div className="navRoutes w-[70%]  flex items-center justify-center gap-[3rem] h-14 text-xl tracking-wider">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-[var(--nav-h)] font-semibold ml-12"
              : "text-[var(--nav-t)] hover:text-[var(--nav-h)] ml-12"
          }
          to="/"
        >
          Home
        </NavLink>
        {user && user.isAdmin && (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[var(--nav-h)] font-semibold"
                : "text-[var(--nav-t)] hover:text-[var(--nav-h)]"
            }
            to="/create-product"
          >
            Create Product
          </NavLink>
        )}
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-[var(--nav-h)] font-semibold"
              : "text-[var(--nav-t)] hover:text-[var(--nav-h)]"
          }
          to="/aboutUs"
        >
          About
        </NavLink>
        {user?.length == 0 ? (
          ""
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[var(--nav-h)] font-semibold"
                : "text-[var(--nav-t)] hover:text-[var(--nav-h)]"
            }
            to="/user/cart"
          >
            Cart
          </NavLink>
        )}
      </div>
      <div className="searchBar w-[22%] relative ml-10 ">
        <input
          onChange={searchHandler}
          className=" w-full px-5 py-3 text-sm rounded-4xl bg-[var(--nav)] border-0 outline-0 "
          placeholder="Search Product"
        />
        <i className="absolute right-5 top-2 ri-search-line"></i>
      </div>
      {/* // login and logout button */}
     <div className="navLogin flex items-center justify-center w-[10%]">
  {user?.length === 0 ? (
    <button
      onClick={() => navigate("/login")}
      className="profileBtnBak hover:scale-98 active:scale-97 px-3 py-2 bg-[var(--btn)] rounded-md tracking-wider w-fit text-xl flex items-center justify-center gap-2"
    >
      {/* 👤 Mobile Icon */}
      <i className="ri-user-add-line inline md:hidden profileIcon"></i>

      {/* 🖥️ Desktop Text */}
      <h1 className="login hidden md:inline">Login</h1>
    </button>
  ) : (
    <button
      onClick={() => navigate("/user/profile")}
      className="profileImage w-12 h-12 rounded-full ml-15 hover:scale-103 active:scale-100 overflow-hidden flex items-center justify-center"
    >
      {/* 👤 Mobile Icon */}
      <i className="ri-user-follow-line inline md:hidden profileIcon text-xl"></i>

      {/* 🖼️ Desktop Image */}
      <img
        className="w-full h-full object-cover hidden md:inline"
        src={user?.profile}
        alt="Profile"
      />
    </button>
  )}
</div>

      {/* Routes for moblie */}
      <MobileNav/>
    </nav>
  );
};

export default Nav;
