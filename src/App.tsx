import React from "react";
import { RouterProvider } from "react-router-dom";

import routes from "./components/routes";
import "./App.css";

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
