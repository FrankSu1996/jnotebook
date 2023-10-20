"use client";

import { createSlice } from "@reduxjs/toolkit";

export type CellTypes = "code" | "text";
export interface Cell {
  id: string;
  type: CellTypes;
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
  name: "cell",
  initialState,
  reducers: {},
});

export const {} = cellSlice.actions;

export default cellSlice.reducer;
