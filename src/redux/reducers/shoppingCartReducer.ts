// shoppingCartReducer.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import {v4 as uuidv4} from "uuid";


interface CartItem extends Product {
  quantity: number,
  amount: number
  cartId: string
}

interface CartType {
  items: CartItem[],
  totalAmount: number,
  totalQuantity: number
}

const initialState: CartType = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
        const newItem = action.payload;
        const existingItem = state.items.find((item) => item.id === newItem.id);
      
        if (existingItem) {
          existingItem.quantity += 1;
          existingItem.amount = existingItem.quantity * existingItem.price;
        } else {
          const cartItem: CartItem = {
            ...newItem,
            quantity: 1,
            amount: newItem.price,
            cartId: uuidv4()
          };
          state.items.push(cartItem);
        }
      
        state.totalQuantity += 1;
        state.totalAmount += newItem.price;
      
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const cartItemId = action.payload;
      const index = state.items.findIndex(
        (item) => item.cartId === cartItemId
      );
      if (index !== -1) {
        const removedItem = state.items.splice(index, 1)[0];
        state.totalQuantity -= removedItem.quantity;
        state.totalAmount -= removedItem.amount;
      }
    },
    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      const cartItemId = action.payload;
      const item = state.items.find((item) => item.cartId === cartItemId);
      if (item) {
        item.quantity += 1;
        item.amount = item.quantity * item.price;
        state.totalQuantity += 1;
        state.totalAmount += item.price;
      }
    },
    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const cartItemId = action.payload;
      const item = state.items.find((item) => item.cartId === cartItemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.amount = item.quantity * item.price;
        state.totalQuantity -= 1;
        state.totalAmount -= item.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    }
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;





// interface ShoppingCartState {
//   items: Product[];
// }

// const initialState: ShoppingCartState = {
//   items: [],
// };

// const shoppingCartSlice = createSlice({
//   name: "shoppingCart",
//   initialState,
//   reducers: {
//     addItem: (state, action: PayloadAction<Product>) => {
//       state.items.push(action.payload);
//     },
//     removeItem: (state, action: PayloadAction<string>) => {
//       const cartItemId = action.payload;
//       const index = state.items.findIndex(
//         (item) => item.cartId === cartItemId
//       );
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addItem, removeItem, clearCart } = shoppingCartSlice.actions;
// export default shoppingCartSlice.reducer;
