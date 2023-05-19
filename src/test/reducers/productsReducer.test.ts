import productsReducer, {
  fetchAllProducts,
 // setCurrentPage,
} from "../../redux/reducers/productsReducer";
import store from "../shared/store";

describe("Testing productsReducer", () => {
  test("Check initialState", () => {
    const state = productsReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      products: [],
      loading: false,
      error: "",
    });
  });
  // test("Shuold set current page", () => {
  //   store.dispatch(setCurrentPage(2));
  //   expect(store.getState().productsReducer.currentPage).toBe(2);
  // });

  test("Check if fetching all products works", async () => {
    await store.dispatch(fetchAllProducts());
    //expect(store.getState().productsReducer.products.length).toBe(5);
    expect(store.getState().productsReducer.loading).toBeFalsy();
    expect(store.getState().productsReducer.error).toBeFalsy();
  });
});
