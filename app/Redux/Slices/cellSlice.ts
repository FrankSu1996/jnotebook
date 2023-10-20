"use client";

import { createSlice } from "@reduxjs/toolkit";
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
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

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
    },
    moveCell: (state, action: { payload: { id: string; direction: Direction } }) => {
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },
    insertCellBefore: (state, action: { payload: { id: string | null; cellType: CellType } }) => {
      const cell: Cell = {
        content: "",
        type: action.payload.cellType,
        id: uuidv4(),
      };

      state.data[cell.id] = cell;
      const index = state.order.findIndex((id) => id === action.payload.id);
      if (index < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(index, 0, cell.id);
      }
    },
  },
});

export const { deleteCell, insertCellBefore, moveCell, updateCell } = cellSlice.actions;

export default cellSlice.reducer;
export const selectData = (state: RootState) => state.cells.data;
export const selectOrder = (state: RootState) => state.cells.order;
