import InfiniteScroll from "react-infinite-scroll-component";
import ProductsLoader from "./user/ProductsLoader";
import { useSelector } from "react-redux";
import useFetchproduct from "./user/useFetchproduct";

const Products = () => {
  const products = useSelector((state) => state.productReducer.products);
  const searchQuery = useSelector((state) => state.productReducer.searchQuery);
  const { fetchProducts, hasMore } = useFetchproduct();

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
      )
    : products;

  const renderProduct = filteredProducts.map((product) => (
    <ProductsLoader key={product.id} product={product} />
  ));

  return (
    <>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={
          <h4 className="text-center text-[var(--text-h)]">Loading...</h4>
        }
        endMessage={
          <p className="text-center text-[var(--text-h)] mt-4">
            <b></b>
          </p>
        }
      >
        <div className="productCartContainer p-6 flex gap-8 flex-wrap pb-20">{renderProduct}</div>
      </InfiniteScroll>
    </>
  );
};

export default Products;
