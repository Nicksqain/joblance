import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
const initialState = {
  user: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUser(state, action) {
      const socket = io(
        "http://localhost:8000",
        {
          path: "/socket.io",
        },

        {
          reconnection: true,
        }
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = chatSlice.actions;

export default chatSlice.reducer;
