import { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { asyncGetCurrentUser } from "./store/userActions.jsx";
import { asyncLoadProduct } from "./store/productActions";
import Footer from "./pages/Footer.jsx";

const Nav = lazy(() => import("./components/Nav"));
const MainRoutes = lazy(() => import("./routes/MainRoutes"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetCurrentUser());
    dispatch(asyncLoadProduct());
  }, []);

  return (
    <div className="mainDiv min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text-h)]">
      <Suspense
        fallback={<div className="text-center py-4">Loading E-Cart...</div>}
      >
        <Nav />
        <main className="flex-grow">
          <MainRoutes />
        </main>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
