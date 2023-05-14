import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";

const initialState: Product[] = [
    {
        "id": 4,
        "title": "Handmade Fresh Table",
        "price": 687,
        "description": "Andy shoes are designed to keeping in...",
        "category": {
            "id": 5,
            "name": "Others",
            "image": "https://placeimg.com/640/480/any?r=0.591926261873231"
        },
        "images": [
            "https://placeimg.com/640/480/any?r=0.9178516507833767",
            "https://placeimg.com/640/480/any?r=0.9300320592588625",
            "https://placeimg.com/640/480/any?r=0.8807778235430017"
        ]
    }
];

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
});

const productsReducer = productsSlice.reducer;
export const { createProduct, getProductList } = productsSlice.actions;
export default productsReducer;
