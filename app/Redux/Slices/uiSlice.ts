import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { cellSlice } from "./cellSlice";
import { createSelector } from "@reduxjs/toolkit";

type DialogType = "create-notebook" | "create-note" | null;

export interface UiState {
  createNoteDialogNotebookId: string | null;
  isDialogOpen: boolean;
  cursorInsideCodeEditor: {
    [key: string]: boolean;
  };
  dialog: {
    open: boolean;
    dialogType: DialogType;
  };
}

const initialState: UiState = {
  cursorInsideCodeEditor: {},
  isDialogOpen: false,
  dialog: {
    open: false,
    dialogType: null,
  },
  createNoteDialogNotebookId: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsDialogOpen: (state, action) => {
      state.isDialogOpen = action.payload;
    },
    setCreateNoteDialogNotebookId: (state, action) => {
      state.createNoteDialogNotebookId = action.payload;
    },
    setCursorInsideCodeEditor: (
      state,
      action: {
        payload: { id: string; cursorIsInside: boolean };
      },
    ) => {
      state.cursorInsideCodeEditor[action.payload.id] = action.payload.cursorIsInside;
    },
    setDialog: (state, action: { payload: { open: boolean; dialogType: DialogType } }) => {
      state.dialog = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(cellSlice.actions.insertCellAfter, (state, action) => {
      if (action.payload.cellType === "code") {
        const cellId = action.payload.newCellId;
        state.cursorInsideCodeEditor[cellId] = false;
      }
    });
    builder.addCase(cellSlice.actions.deleteCell, (state, action) => {
      delete state.cursorInsideCodeEditor[action.payload];
    });
  },
});

export const { setCursorInsideCodeEditor, setIsDialogOpen, setDialog, setCreateNoteDialogNotebookId } = uiSlice.actions;

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
export const selectDialog = (state: RootState) => state.ui.dialog;
export const selectCreateNoteDialogNotebookId = (state: RootState) => state.ui.createNoteDialogNotebookId;
