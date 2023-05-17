import shoppingCartReducer, { addItem } from "../../redux/reducers/shoppingCartReducer";
import { Product } from "../../types/Product";


describe("testing shoppingCartReducer", () => {
  test("Check initialState", () => {
    const state = shoppingCartReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      items: [],
    });
  });
  test("Check should add new item", () => {
    const item : Product  = {
      id: 1,
      title: "Test",
      description: "Test",
      price: 100,
        category: {
            id: 1,
            name: "Test",
            image: "Test"
        },
        images: ["Test"]
    };
    const state = shoppingCartReducer(undefined, addItem(item));
    expect(state).toEqual({
      items: [item],
    });
    });
});

