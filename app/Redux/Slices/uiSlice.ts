import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { cellSlice } from "./cellSlice";
import { createSelector } from "@reduxjs/toolkit";

export interface UiState {
  dialogs: {
    showLoginDialog: boolean;
    showSaveDialog: boolean;
  };
  cursorInsideCodeEditor: {
    [key: string]: boolean;
  };
  codeCellWidth: {
    [key: string]: number;
  };
}

const initialState: UiState = {
  dialogs: {
    showLoginDialog: false,
    showSaveDialog: false,
  },
  cursorInsideCodeEditor: {},
  codeCellWidth: {},
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowLoginDialog: (state, action) => {
      state.dialogs.showLoginDialog = action.payload;
    },
    setCursorInsideCodeEditor: (
      state,
      action: {
        payload: { id: string; cursorIsInside: boolean };
      },
    ) => {
      state.cursorInsideCodeEditor[action.payload.id] = action.payload.cursorIsInside;
    },
    setCodeCellWidth: (
      state,
      action: {
        payload: { id: string; width: number };
      },
    ) => {
      state.codeCellWidth[action.payload.id] = action.payload.width;
    },
  },
  extraReducers(builder) {
    builder.addCase(cellSlice.actions.insertCellAfter, (state, action) => {
      if (action.payload.cellType === "code") {
        const cellId = action.payload.newCellId;
        state.cursorInsideCodeEditor[cellId] = false;
        state.codeCellWidth[cellId] = 0;
      }
    });
    builder.addCase(cellSlice.actions.deleteCell, (state, action) => {
      delete state.cursorInsideCodeEditor[action.payload];
      delete state.codeCellWidth[action.payload];
    });
  },
});

export const { setShowLoginDialog, setCursorInsideCodeEditor, setCodeCellWidth } = uiSlice.actions;

export default uiSlice.reducer;

export const selectShowLoginDialog = (state: RootState) => state.ui.dialogs.showLoginDialog;
export const selectCursorInsideCodeEditor = createSelector(
  // Input selectors: Get parts of the state you're interested in
  (state: RootState, cellId) => state.ui.cursorInsideCodeEditor[cellId],

  // Result function: Return whatever you want based on the input selectors
  (cursorInsideCodeEditor) => cursorInsideCodeEditor,
);
export const selectIsAnyDialogOpen = (state: RootState) => {
  return Object.values(state.ui.dialogs).some((value) => value === true);
};
export const selectAnyCursorInsideCodeEditor = (state: RootState) => {
  return Object.values(state.ui.cursorInsideCodeEditor).some((value) => value);
};
export const selectCodeCellWidth = (cellId) => (state: RootState) => state.ui.codeCellWidth[cellId];
