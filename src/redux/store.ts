import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";
import modalReducer from "./reducers/modalReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import favReducer from "./reducers/favReducer";

const favData = JSON.parse(localStorage.getItem("fav") || "")


const store = configureStore({
  reducer: {
  productsReducer,
  usersReducer,
  modalReducer,
  shoppingCartReducer,
  favReducer,
  },
  preloadedState: {
    favReducer: favData
  }
  
})

store.subscribe(() => {
  localStorage.setItem("fav", JSON.stringify(store.getState().favReducer))
})

export type GlobalState = ReturnType<typeof store.getState>; //typeskript shortcut to get the type of the global state
export type AppDispatch = typeof store.dispatch; 
export default store;
