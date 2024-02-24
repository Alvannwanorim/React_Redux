import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

interface UsersState {
  id: string;
  name: string;
}

const initialState: UsersState[] = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await axios.get(USERS_URL);
  // console.log(data);

  return data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log(action.payload);

      return action.payload;
    });
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
