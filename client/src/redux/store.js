import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slices/chat/chatSlice";

export const store = configureStore({
  reducer: { user: chatSlice },
});
