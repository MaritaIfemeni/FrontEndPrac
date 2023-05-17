import usersReducer, { createUser } from "../../redux/reducers/usersReducer";
import { User } from "../../types/User";

describe("testinf userReduser", () => {
  test("Check initialState", () => {
    const state = usersReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      users: [],
      loading: false,
      error: "",
    });
  });
  test("Check should create new user", () => {
    const user: User = {
      id: 1,
      email: "test@gmail.com",
      role: "customer",
      password: "tester",
      name: "Tester",
      avatar: "",
    };
    const state = usersReducer(undefined, createUser(user));
    expect(state).toEqual({
      users: [user],
      loading: false,
      error: "",
    });
  });
});

