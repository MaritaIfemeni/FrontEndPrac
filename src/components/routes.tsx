import React from "react";
import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import PageNotFound from "../pages/PageNotFound";
import ProductsPage from "../pages/ProductsPage";
import LoginPage from "../pages/LogInPage";
import Cart from "../pages/Cart";
import SingeleProductPage from "../pages/SingeleProductPage";
import ProfilePage from "../pages/ProfilePage";

const routes: any = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/products/:id",
        element: <SingeleProductPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        // children: [
        //   {
        //     path: "/Profile",
        //     element: <ProfilePage />,
        //   }
        // ]
      },
      {
        path: "/productslist",
        element: <ProductsPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

export default routes;
