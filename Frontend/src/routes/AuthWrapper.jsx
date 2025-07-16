import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthWrapper = ({ children, access = "public" }) => {
  const { users } = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Delay to allow Redux to load users from localStorage
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 100); // adjust delay if needed

    return () => clearTimeout(timeout);
  }, [users]);

  const isUserLoggedIn = users && Object.keys(users).length > 0;
  const isAdmin = isUserLoggedIn && users?.isAdmin;

  if (isLoading) return null; // or <LoadingSpinner />

  // Public routes: allow only if not logged in
  if (access === "public") {
    return isUserLoggedIn ? <Navigate to="/user/profile" /> : children;
  }

  // Auth routes: allow only if logged in
  if (access === "auth") {
    return isUserLoggedIn ? children : <Navigate to="/login" />;
  }

  // Admin routes: allow only if logged in as admin
  if (access === "admin") {
    return isAdmin ? children : <Navigate to="/" />;
  }

  return children;
};

export default AuthWrapper;
