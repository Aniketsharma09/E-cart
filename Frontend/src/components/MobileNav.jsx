import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const MobileNav = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    let user = useSelector((state) => state.userReducer.users);
    const noUserClass =
        !user || // null or undefined
        (Array.isArray(user) && user.length === 0) || // empty array
        (typeof user === "object" && Object.keys(user).length === 0) || // empty object
        !user.isAdmin; 

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show nav when scrolling up or at the top
            if (currentScrollY < lastScrollY || currentScrollY < 10) {
                setIsVisible(true);
            } 
            // Hide nav when scrolling down (and not at the top)
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }
            
            setLastScrollY(currentScrollY);
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div  
            className={`navMobileRoutes hidden ${noUserClass ? "noUser" : ""} 
                fixed bottom-0 left-0 right-0 z-0 
                backdrop-blur-lg backdrop-saturate-150 
                transition-transform duration-300 ease-in-out
                ${isVisible ? 'translate-y-0' : 'translate-y-full'}
            `}
            style={{
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                backgroundColor: 'color-mix(in srgb, var(--nav) 50%, transparent 50%)'
            }}
        >
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