import usersReducer, {
  createUser,
  emptyUsersReducer,
  sortByEmail,
  updateOneUser,
  fetchAllUsers,
} from "../../redux/reducers/usersReducer";
import { User } from "../../types/User";
import { user1, user2, user3 } from "../data/users";
import store from "../shared/store";

beforeEach(() => {
  store.dispatch(emptyUsersReducer());
  store.dispatch(createUser(user1));
  store.dispatch(createUser(user2));
  store.dispatch(createUser(user3));
});

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
  test("Test empty user list", () => {
    const user: User = {
      id: 1,
      email: "testemail",
      role: "customer",
      password: "tester",
      name: "Tester",
      avatar: "",
    };
    const state = usersReducer(
      {
        users: [user],
        loading: false,
        error: "",
      },
      emptyUsersReducer()
    );
    expect(state.users.length).toBe(0);
  });

  test("Test update one user", () => {
    // createUser({
    //   id: 1,
    //   email: "testemail",
    //   role: "customer",
    //   password: "tester",
    //   name: "Tester",
    //   avatar: "",
    // })
    // );
    expect(store.getState().usersReducer.users.length).toBe(3);
    store.dispatch(
      updateOneUser({
        id: 1,
        update: {
          email: "alia@mail.com",
          password: "alia",
          name: "alia",
          role: "customer",
          avatar: "",
        },
      })
    );

    expect(store.getState().usersReducer.users[0]).toEqual({
      id: 1,
      email: "alia@mail.com",
      password: "alia",
      name: "alia",
      role: "customer",
      avatar: "",
    });
  });
  test("Test sort by email", () => {
    console.log(store.getState().usersReducer.users);
    store.dispatch(sortByEmail("asc"));
    expect(store.getState().usersReducer.users).toEqual([user3, user1, user2]);
    store.dispatch(sortByEmail("desc"));
    expect(store.getState().usersReducer.users).toEqual([user2, user1, user3]);
  });
  test("Check should fetch all users", async () => {
    //only can check the final result
    await store.dispatch(fetchAllUsers())
    //expect(store.getState().usersReducer.users.length).toBe(4)
    expect(store.getState().usersReducer.loading).toBeFalsy()
    expect(store.getState().usersReducer.error).toBeFalsy() //empty string is interpreted as falsy value if JS
})
});
