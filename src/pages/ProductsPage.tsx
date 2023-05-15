import React, { useEffect, useState } from "react";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  createProduct,
  fetchAllProducts,
  setCurrentPage,
} from "../redux/reducers/productsReducer";
import { Product } from "../types/Product";

const getFilteredList = (users: Product[], search: string) => {
  return users.filter((user) =>
    user.title.toLowerCase().includes(search.toLocaleLowerCase())
  );
};

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer.products);
  const currentPage = useAppSelector(
    (state) => state.productsReducer.currentPage
  );
  //const [page, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const filterProducts = getFilteredList(products, search);

  useEffect(() => {
    dispatch(fetchAllProducts(currentPage));
    console.log("products", products);
  }, []);

  const onSerachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleNextPage = () => {
    dispatch(fetchAllProducts(currentPage + 1));
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchAllProducts(currentPage - 1));
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <div>
      ProdyctPage
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.images}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevPage}>Prev</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default ProductsPage;
