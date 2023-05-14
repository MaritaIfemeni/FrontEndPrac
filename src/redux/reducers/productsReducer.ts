import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product } from "../../types/Product";

const initialState: Product[] = [
  {
    id: 4,
    title: "Handmade Fresh Table",
    price: 687,
    description: "Andy shoes are designed to keeping in...",
    category: {
      id: 5,
      name: "Others",
      image: "https://placeimg.com/640/480/any?r=0.591926261873231",
    },
    images: [
      "https://placeimg.com/640/480/any?r=0.9178516507833767",
      "https://placeimg.com/640/480/any?r=0.9300320592588625",
      "https://placeimg.com/640/480/any?r=0.8807778235430017",
    ],
  },
];

export const fetchAllProducts = createAsyncThunk(
  "fetcAllProducts",
  async () => {
    try {
      const result = await axios.get<Product[]>(
        "https://api.escuelajs.co/api/v1/products"
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      if (error.request) {
        console.log("erorr in product request", error.request);
      } else {
        console.log(error.response?.data);
      }
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    getProductList: (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchAllProducts.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload;
      }
    });
  },
});

const productsReducer = productsSlice.reducer;
export const { createProduct, getProductList } = productsSlice.actions;
export default productsReducer;
