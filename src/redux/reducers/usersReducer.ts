import { createAsyncThunk, createSlice, isAction, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { User } from "../../types/User";
import { UserUpdate } from "../../types/UserUpdate";

// const initialState: User[] = [
//   {
//     id: 1,
//     name: "me",
//     email: "email@email",
//     password: "password",
//     role: "customer",
//     avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
//   },
// ];

const initialState: {
  users: User[];
  //filterList: User[], 
  loading: boolean;
  error: string;
} = {
  users: [],
  loading: false,
  error: "",
};

export const fetchAllUsers = createAsyncThunk("fetcAllUsers", async () => {
  try {
    const result = await axios.get<User[]>(
      "https://api.escuelajs.co/api/v1/users"
    );
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    if (error.request) {
      console.log("erorr in user request", error.request);
    } else {
      console.log(error.response?.data);
    }
  }
});

//No async accepted !!!!!! Remember! New versuib of redux you can use extra Reducer
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUserReducer: (state, action: PayloadAction<User[]>) => {
      //return action.payload;
      return {
        ...state,
        users: []
      }
    },
    emptyUsersReducer: (state) => {
      //return [];
      state.users = []
    },
    updateOneUser: (state, action: PayloadAction<UserUpdate>) => {
      const users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, ...action.payload.update };
        }
        return user;
      });
      return {
        ...state,
        users,
      }
    },
    sortByEmail: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.users.sort((a, b) => a.email.localeCompare(b.email));
      } else {
        state.users.sort((a, b) => b.email.localeCompare(a.email));
      }
    },
    //This is taking lots of memeory as it updates the orginal list and the filterlist
    // filterOnName: (state, action) => {
    //   const filterList = state.filterList.filter()
    //   return {...state, filterList}
    // }
  },
  extraReducers: (build) => {
    build.addCase(fetchAllUsers.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          users: action.payload
        }
      }
    });
  },
});

const usersReducer = usersSlice.reducer;
export const {
  createUser,
  updateUserReducer,
  emptyUsersReducer,
  updateOneUser,
  sortByEmail,
} = usersSlice.actions;
export default usersReducer;
