import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UiState {
  showLoginDialog: false;
}

const initialState: UiState = {
  showLoginDialog: false,
};

export const cellSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    setShowLoginDialog: (state, action) => {
      state.showLoginDialog = action.payload;
    },
  },
});

export const { setShowLoginDialog } = cellSlice.actions;

export default cellSlice.reducer;

export const selectShowLoginDialog = (state: RootState) => state.ui.showLoginDialog;
