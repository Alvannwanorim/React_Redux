import { createSlice } from "@reduxjs/toolkit";

interface UsersState {
  id: string;
  name: string;
}

const initialState: UsersState[] = [
  { id: "1", name: "Dude Lebowski" },
  { id: "2", name: "Neil Young" },
  { id: "3", name: "Dave Gray" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
