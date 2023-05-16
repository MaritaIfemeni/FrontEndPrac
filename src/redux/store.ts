import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";
import modalReducer from "./reducers/modalReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";

const store = configureStore({
  reducer: {
  productsReducer,
  usersReducer,
  modalReducer,
  shoppingCartReducer,
  },
});

export type GlobalState = ReturnType<typeof store.getState>; //typeskript shortcut to get the type of the global state
export type AppDispatch = typeof store.dispatch; 
export default store;
