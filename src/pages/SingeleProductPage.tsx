import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
//import axios from "axios";

import { Product } from "../types/Product";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { addItemToCart } from "../redux/reducers/shoppingCartReducer";

const SingleProductPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const { id } = useParams();
  const selectedProduct =
    products && products.find((product: Product) => product.id === Number(id));
  const relatedProducts = products.filter(
    (product) => product.category?.name === selectedProduct?.category?.name
  );
  const relatedProductsLimit = relatedProducts.slice(0, 10);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    selectedProduct
  );

  // const [currentRelatedProducts, setCurrentRelatedProducts] = useState <Product[] | undefined>(
  //   relatedProducts
  // );

  // const [currentRelatedProductsLimit, setCurrentRelatedProductsLimit] = useState <Product[] | undefined>(
  //   relatedProductsLimit
  // );

  useEffect(() => {
    if (selectedProduct) {
      setCurrentProduct(selectedProduct);
      // setCurrentRelatedProducts(relatedProducts);
      // setCurrentRelatedProductsLimit(relatedProductsLimit);
      localStorage.setItem("currentProduct", JSON.stringify(selectedProduct));
      localStorage.setItem(
        "currentRelatedProducts",
        JSON.stringify(relatedProducts)
      );
    }
  }, []);

  useEffect(() => {
    setCurrentProduct(
      JSON.parse(localStorage.getItem("currentProduct") || "{}")
    );
    // setCurrentRelatedProducts(
    //   JSON.parse(localStorage.getItem("currentRelatedProducts") || "{}")
    // );
    // setCurrentRelatedProductsLimit( JSON.parse(localStorage.getItem("currentRelatedProductsLimit") || "{}"));
  }, []);

  // const { id } = useParams<{ id: string }>();
  // const [product, setProduct] = useState<Product>();
  // const [error, setError] = useState("");
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   axios
  //     .get(`https://api.escuelajs.co/api/v1/products/${id}`)
  //     .then((response) => {
  //       setProduct(response.data);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }, [id]);
  // if (!product) {
  //   return <p>Loading...</p>;
  // }
  // if (error) {
  //   return <p>{error}</p>;
  // }

  const handleAddToCart = (product: Product | undefined) => {
    if (product) {
      dispatch(addItemToCart(product));
    }
  };

  return (
    <div>
      SingeleProductPage
      <p>{currentProduct?.title}</p>
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
          <tr>
            <td>{currentProduct?.title}</td>
            <td>{currentProduct?.price}</td>
            <td>{currentProduct?.description}</td>
            <button onClick={() => handleAddToCart(currentProduct)}>
              Add to cart
            </button>
          </tr>
        </tbody>
      </table>
      <div>
        <h2>Related Products</h2>
        {relatedProductsLimit?.map((product) => (
          <p>
            key={product.id}
            title={product.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SingleProductPage;
