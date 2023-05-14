import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { GlobalState } from "../redux/store";
import useAppSelector from "../hooks/useAppSelector";
import { createUser, emptyUsersReducer, fetchAllUsers, updateUserReducer, updateOneUser } from "../redux/reducers/usersReducer";
import useAppDispatch from "../hooks/useAppDispatch";
import { createProduct, fetchAllProducts, getProductList } from "../redux/reducers/productsReducer";
import GoogleLoginBtn from "../components/GoogleLoginBtn";

const HomePage = () => {
  const location = useLocation();
  const isProductsPage = location.pathname.includes("products");
  const isLoginPage = location.pathname === "/login";
  const hideProductList = useLocation();

  // const globalState = useSelector(state => state);
  // console.log("globalState", globalState);

  //const users = useSelector((state:GlobalState) => state.usersReducer);
  const users = useAppSelector((state) => state.usersReducer);
  console.log("users", users);
  const dispatch = useAppDispatch();
  const addUser = () => {
    // const result = createUser({});
    // console.log(result);
    dispatch(
      createUser({
        id: 211,
        name: "test",
        avatar: "test",
        password: "test",
        email: "test",
        role: "customer",
      })
    );
  };

  const products = useAppSelector((state) => state.productsReducer);
  console.log("products", products);
  const addProduct = () =>
  dispatch(createProduct({
    id: 211,
    title: "test",
    price: 100,
    description: "test",
  category: {
    id: 1,
    name: "test",
    image: "test",
  }, 
 images: [
  "string, string, string"
 ]
  }));

useEffect(() => {
  dispatch(fetchAllUsers());
  //dispatch(fetchAllProducts());
}, []);

const deletaAllUsers = () => {
  dispatch(emptyUsersReducer());
}

const updateUser = () => {
  dispatch(updateOneUser({
    id: 1,
    update: {
      email: "alia@mail.com",
      password: "alia",
      role: "customer",
      name: "alia",
      avatar: ""
    }
  }))
}





  //Only example not recomended, dont fecth inside the component, should be done inside redux
  //Ans also not reusable and It is hard to test
  //  useEffect(() => {
  //    fetch("https://api.escuelajs.co/api/v1/products")
  //      .then(response => response.json())
  //      .then(response => dispatch(getProductList(response)))
  //  }, []);

  // show product list on homepage
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Log In</Link>
          <Link to="/products">Products</Link>
          <Link to="/productslist">Products List</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <main>
 <GoogleLoginBtn />
      {!isProductsPage && !isLoginPage && (
   <div>
<ul> {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}</ul>

      {/* <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul> */}
      <button onClick={addUser}>Create new user</button>
        <button onClick={addProduct}>Create new product</button>
        <button onClick={deletaAllUsers}>Empty User array</button>
        <button onClick={updateUser}>Update user</button>
          <p>What ever I put here will be shown only in home page and Cart </p>
        </div>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default HomePage;
