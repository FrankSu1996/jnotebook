import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { cellSlice } from "./cellSlice";
import { createSelector } from "@reduxjs/toolkit";

export interface UiState {
  isDialogOpen: boolean;
  cursorInsideCodeEditor: {
    [key: string]: boolean;
  };
  codeCellWidth: {
    [key: string]: number;
  };
}

const initialState: UiState = {
  cursorInsideCodeEditor: {},
  codeCellWidth: {},
  isDialogOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsDialogOpen: (state, action) => {
      state.isDialogOpen = action.payload;
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

export const { setCursorInsideCodeEditor, setCodeCellWidth, setIsDialogOpen } = uiSlice.actions;

export default uiSlice.reducer;
export const selectCursorInsideCodeEditor = createSelector(
  // Input selectors: Get parts of the state you're interested in
  (state: RootState, cellId) => state.ui.cursorInsideCodeEditor[cellId],

  // Result function: Return whatever you want based on the input selectors
  (cursorInsideCodeEditor) => cursorInsideCodeEditor,
);
export const selectIsAnyDialogOpen = (state: RootState) => state.ui.isDialogOpen;
export const selectAnyCursorInsideCodeEditor = (state: RootState) => {
  return Object.values(state.ui.cursorInsideCodeEditor).some((value) => value);
};
export const selectCodeCellWidth = (cellId) => (state: RootState) => state.ui.codeCellWidth[cellId];
