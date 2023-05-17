import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../../redux/reducers/productsReducer"
import usersReducer from    "../../redux/reducers/usersReducer"
import modalReducer from    "../../redux/reducers/modalReducer"
import shoppingCartReducer from "../../redux/reducers/shoppingCartReducer"
import favReducer from "../../redux/reducers/favReducer"


const store = configureStore({
  reducer: {
  productsReducer,
  usersReducer,
  modalReducer,
  shoppingCartReducer,
  favReducer,
  },
  
})


export type GlobalState = ReturnType<typeof store.getState>; //typeskript shortcut to get the type of the global state
export type AppDispatch = typeof store.dispatch; 
export default store;