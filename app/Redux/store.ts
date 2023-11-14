import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cellReducer, { CellState } from "./Slices/cellSlice";
import { UiState } from "./Slices/uiSlice";
import uiReducer from "./Slices/uiSlice";
import persistMiddleware from "./persist-middleware";

export interface RootState {
  cells: CellState;
  ui: UiState;
}

export const store = configureStore({
  reducer: {
    cells: cellReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleware),
});

export type RootReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
