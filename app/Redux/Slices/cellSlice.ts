"use client";

import { bundleRawCode } from "@/lib/bundler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type CellType = "code" | "text";
export type Direction = "up" | "down";

interface RootState {
  cells: CellState;
}
export interface Cell {
  id: string;
  type: CellType;
  content: string;
}

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
  bundledCode: {
    [key: string]:
      | {
          loading: boolean;
          error: "";
          code: "";
        }
      | undefined;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
  bundledCode: {},
};

export const bundleCodeAction = createAsyncThunk<{ bundle: any; cellId: string }, string, { state: RootState }>(
  "cells/bundleCode",
  async (cellId: string, thunkAPI) => {
    const rawCode = thunkAPI.getState().cells.data[cellId].content;
    const bundle = await bundleRawCode(rawCode);
    return {
      bundle,
      cellId,
    };
  },
);

export const cellSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    updateCell: (state, action: { payload: { id: string; content: string } }) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell: (state, action: { payload: string }) => {
      delete state.data[action.payload];
      // Remove the item from the order array
      state.order = state.order.filter((item) => item !== action.payload);
    },
    moveCell: (state, action: { payload: { id: string; direction: Direction } }) => {
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },
    insertCellAfter: (state, action: { payload: { id: string | null; cellType: CellType } }) => {
      const cell: Cell = {
        content: "",
        type: action.payload.cellType,
        id: uuidv4(),
      };

      state.data[cell.id] = cell;

      const index = state.order.findIndex((id) => id === action.payload.id);
      if (index < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bundleCodeAction.pending, (state, action) => {
      state.bundledCode[action.meta.arg] = {
        code: "",
        error: "",
        loading: true,
      };
    });
    builder.addCase(bundleCodeAction.fulfilled, (state, action) => {
      state.bundledCode[action.payload.cellId] = {
        error: action.payload.bundle.error,
        loading: false,
        code: action.payload.bundle.code,
      };
    });
  },
});

export const { deleteCell, insertCellAfter, moveCell, updateCell } = cellSlice.actions;

export default cellSlice.reducer;
export const selectData = (state: RootState) => state.cells.data;
export const selectOrder = (state: RootState) => state.cells.order;
export const selectBundle = (id) => (state: RootState) => state.cells.bundledCode[id];
