import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userslice/UserSlice";
import messageReducer from "../slices/messageslice/MessageSlice";
import groupReducer from "../slices/groupSlice/GroupSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    group: groupReducer
  },
});
