import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";


const MobileNav = () => {

    let user = useSelector((state) => state.userReducer.users);
    const noUserClass =
    !user || // null or undefined
    (Array.isArray(user) && user.length === 0) || // empty array
    (typeof user === "object" && Object.keys(user).length === 0) || // empty object
    !user.isAdmin; 
  return (
    <div  className={`navMobileRoutes hidden ${noUserClass ? "noUser" : ""}`}>
        {/* Home Link */}
        <NavLink
          className={({ isActive }) =>
            `navIcons  ${
              isActive
                ? "text-[var(--nav-h)] font-semibold"
                : "text-[var(--nav-t)] hover:text-[var(--nav-h)]"
            }`
          }
          to="/"
        >
          <i className="ri-home-3-line"></i>
        </NavLink>

        {/* About Us Link */}
        <NavLink
          className={({ isActive }) =>
            `navIcons  ${
              isActive
                ? "text-[var(--nav-h)] font-semibold"
                : "text-[var(--nav-t)] hover:text-[var(--nav-h)]"
            }`
          }
          to="/aboutUs"
        >
          <i className="ri-information-2-line"></i>
        </NavLink>

        {/* Admin Create Product Link */}
        {user?.isAdmin && (
          <NavLink
            className={({ isActive }) =>
              `navIcons  ${
                isActive
                  ? "text-[var(--nav-h)] font-semibold"
                  : "text-[var(--nav-t)] hover:text-[var(--nav-h)]"
              }`
            }
            to="/create-product"
          >
            <i className="ri-add-large-line"></i>
          </NavLink>
        )}

        {/* User Cart Link */}
        {user && (
          <NavLink
            className={({ isActive }) =>
              `navIcons  ${
                isActive
                  ? "text-[var(--nav-h)] font-semibold"
                  : "text-[var(--nav-t)] hover:text-[var(--nav-h)]"
              }`
            }
            to="/user/cart"
          >
          <i className="ri-shopping-cart-2-line"></i>
          </NavLink>
        )}
      </div>
  )
}

export default MobileNav