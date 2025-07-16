import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// ✅ Lazy-loaded components
const Products = lazy(() => import("../pages/Products"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const PageNotFound = lazy(() => import("../PageNotFound"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const UserCarts = lazy(() => import("../pages/UserCarts"));
const AuthWrapper = lazy(() => import("./AuthWrapper"));

const MainRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center text-white py-10 text-xl tracking-wide">
          Loading Page...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/details/:id" element={<ProductDetails />} />
        <Route path="/aboutUs" element={<AboutUs />} />

        <Route
          path="/user/profile"
          element={
            <AuthWrapper access="auth">
              <UserProfile />
            </AuthWrapper>
          }
        />
        <Route
          path="/user/cart"
          element={
            <AuthWrapper access="auth">
              <UserCarts />
            </AuthWrapper>
          }
        />

        <Route
          path="/login"
          element={
            <AuthWrapper access="public">
              <Login />
            </AuthWrapper>
          }
        />

        <Route
          path="/register"
          element={
            <AuthWrapper access="public">
              <Register />
            </AuthWrapper>
          }
        />

        <Route
          path="/create-product"
          element={
            <AuthWrapper access="admin">
              <CreateProduct />
            </AuthWrapper>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
