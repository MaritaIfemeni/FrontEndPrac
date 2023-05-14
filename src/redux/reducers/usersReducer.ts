import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { User } from "../../types/User";

const initialState: User[] = [
  {
    id: 1,
    name: "me",
    email: "email@email",
    password: "password",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
  },
];

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
      state.push(action.payload);
    },
    updateUserReducer: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchAllUsers.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload;
      }
    });
  },
});

const usersReducer = usersSlice.reducer;
export const { createUser, updateUserReducer } = usersSlice.actions;
export default usersReducer;
