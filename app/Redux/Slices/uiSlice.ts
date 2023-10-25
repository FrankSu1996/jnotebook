import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UiState {
  dialogs: {
    showLoginDialog: boolean;
    showSaveDialog: boolean;
  };
  cursorInsideCodeEditor: boolean;
}

const initialState: UiState = {
  dialogs: {
    showLoginDialog: false,
    showSaveDialog: false,
  },
  cursorInsideCodeEditor: false,
};

export const cellSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    setShowLoginDialog: (state, action) => {
      state.dialogs.showLoginDialog = action.payload;
    },
    setCursorInsideCodeEditor: (state, action) => {
      state.cursorInsideCodeEditor = action.payload;
    },
  },
});

export const { setShowLoginDialog, setCursorInsideCodeEditor } = cellSlice.actions;

export default cellSlice.reducer;

export const selectShowLoginDialog = (state: RootState) => state.ui.dialogs.showLoginDialog;
export const selectCursorInsideCodeEditor = (state: RootState) => state.ui.cursorInsideCodeEditor;
export const selectIsAnyDialogOpen = (state: RootState) => {
  return Object.values(state.ui.dialogs).some((value) => value === true);
};
