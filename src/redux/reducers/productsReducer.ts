import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product } from "../../types/Product";
import { number } from "yup";

// const initialState: Product[] = [
//   {
//     id: 4,
//     title: "Handmade Fresh Table",
//     price: 687,
//     description: "Andy shoes are designed to keeping in...",
//     category: {
//       id: 5,
//       name: "Others",
//       image: "https://placeimg.com/640/480/any?r=0.591926261873231",
//     },
//     images: [
//       "https://placeimg.com/640/480/any?r=0.9178516507833767",
//       "https://placeimg.com/640/480/any?r=0.9300320592588625",
//       "https://placeimg.com/640/480/any?r=0.8807778235430017",
//     ],
//   },
// ];

const initialState: {
  products: Product[];
  currentPage: number;
  //productId?: number;
  loading: boolean;
  error: string;
} = {
  products: [],
  currentPage: 1,
  loading: false,
  error: "",
};

// export const fetchProduct = createAsyncThunk(
//   "fetcAllProducts",
//   async (id: number) => {
//     try {
//       const result = await axios.get<Product[]>(
//         `https://api.escuelajs.co/api/v1/products/${id}`
//       );
//       return result.data; // returned result would be inside action.payload
//     } catch (e) {
//       const error = e as AxiosError;
//       return error;
//     }
//   }
// );

export const fetchAllProducts = createAsyncThunk(
  "fetcAllProducts",
  async (page: number) => {
    try {
      const result = await axios.get<Product[]>(
        `https://api.escuelajs.co/api/v1/products?offset=${page}&limit=10`
      );
      return result.data; // returned result would be inside action.payload
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.products = action.payload;
          state.filteredProducts = action.payload;
        }
        state.loading = false;
      })
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.error = "Cannot fetch products";
      });
  },
});

const productsReducer = productsSlice.reducer;
export const { createProduct, setCurrentPage } = productsSlice.actions;
export default productsReducer;
