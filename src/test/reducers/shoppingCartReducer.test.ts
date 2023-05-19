import shoppingCartReducer, { addItemToCart } from "../../redux/reducers/shoppingCartReducer";
import { Product } from "../../types/Product";
import store from "../shared/store";


interface CartType {
  items: CartItem[],
  totalAmount: number,
  totalQuantity: number
}

interface CartItem extends Product {
  quantity: number,
  amount: number
  cartId: string
}

describe("testing shoppingCartReducer", () => {
  test("Check initialState", () => {
    const state = shoppingCartReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      items: [],
      totalAmount: 0,
      totalQuantity: 0,
    });
    });
  });
//   test("Check should add new item", () => {
//     store.dispatch(addItemToCart({} as Product));
//     const state = store.getState().shoppingCartReducer;
//     expect(state.items.length).toBe(1);
//     expect(state.totalQuantity).toBe(1);
// });


