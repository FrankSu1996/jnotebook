import { configureStore } from "@reduxjs/toolkit";
import cellReducer from "./Slices/cellSlice";

export const store = configureStore({
  reducer: {
    cells: cellReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
