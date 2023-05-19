import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchAllProducts } from "../redux/reducers/productsReducer";
import { Product } from "../types/Product";
import {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../redux/reducers/shoppingCartReducer";
import useDebounce from "../hooks/useDebounce";
import getFilteredList from "../hooks/getFilteredList";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer.products);
  //const currentPage = useAppSelector((state) => state.productsReducer.currentPag);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 500);
  const filterProducts = getFilteredList(products, debouncedSearch);

  const [page, setPage] = useState(1);
  const limit = 5;

  const filteredProducts = products.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    dispatch(fetchAllProducts());
    //dispatch(fetchAllProducts(currentPage));
    //console.log("products", products);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [products]);

  const onSerachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addItemToCart(product));
  };

  // const handleNextPage = () => {
  //   dispatch(fetchAllProducts(currentPage + 1));
  //   dispatch(setCurrentPage(currentPage + 1));
  // };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     dispatch(fetchAllProducts(currentPage - 1));
  //     dispatch(setCurrentPage(currentPage - 1));
  //   }
  //};

  const handleSeeMore = () => {
    setPage(page + 1);
  };

  const handleGoBack = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      ProdyctPage
      <div>
        <input
          type="text"
          name="search"
          value={search}
          placeholder="Search"
          onChange={onSerachChange}
        />
        {search !== "" && filterProducts.length > 0 && (
          <ul>
            {filterProducts.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Description</th>
            <th>Product Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <Link to={`/products/${product.id}`}>
                  <button>details</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleAddToCart(product)}>
                  Add to cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleSeeMore}>See More</button>
        <button onClick={handleGoBack} disabled={page === 1}>
          Go Back
        </button>
      </div>
      {/* <button onClick={handlePrevPage}>Prev</button>
      <button onClick={handleNextPage}>Next</button> */}
    </div>
  );
};

export default ProductsPage;
