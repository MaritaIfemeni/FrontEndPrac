import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.push(action.payload);
    },
  },
});

const usersReducer = usersSlice.reducer;
export const { createUser } = usersSlice.actions;
export default usersReducer;
