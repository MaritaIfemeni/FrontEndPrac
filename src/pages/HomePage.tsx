import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { GlobalState } from "../redux/store";
import useAppSelector from "../hooks/useAppSelector";
import { createUser } from "../redux/reducers/usersReducer";

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
  const addUser = () => {
    const result = createUser({});
    console.log(result);
  };

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
        <button onClick={addUser}>Create new user</button>
        {!isProductsPage && !isLoginPage && (
          <p>What ever I put here will be shown only in home page and Cart </p>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default HomePage;
