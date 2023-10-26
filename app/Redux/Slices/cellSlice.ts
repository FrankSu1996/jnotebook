"use client";

import { bundleRawCode } from "@/lib/bundler";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { POSTCellsRequestBody } from "@/types/api";

export type CellType = "code" | "text";
export type Direction = "up" | "down";

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}

export interface CellState {
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

// thunks
export const bundleCodeAction = createAsyncThunk<{ bundle: any; cellId: string }, { cellId: string; rawCode: string }, { state: RootState }>(
  "cells/bundleCode",
  async ({ cellId, rawCode }) => {
    const bundle = await bundleRawCode(rawCode);
    return {
      bundle,
      cellId,
    };
  },
);
export const saveCellsToFileAction = createAsyncThunk<void, { userEmail: string; fileName: string }, { state: RootState }>(
  "cells/saveCells",
  async ({ userEmail, fileName }, { getState }) => {
    const {
      cells: { data, order },
    } = getState();

    const cells = order.map((id) => data[id]);
    const body: POSTCellsRequestBody = {
      cells,
      fileName,
      userEmail,
    };
    const response = await fetch("/api/cells", { method: "post", body: JSON.stringify(body) });
    return await response.json();
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
    insertCellAfter: (state, action: { payload: { id: string | null; cellType: CellType; newCellId: string } }) => {
      const cell: Cell = {
        content: "",
        type: action.payload.cellType,
        id: action.payload.newCellId,
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
      state.bundledCode[action.meta.arg.cellId] = {
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

// Memoized selector to get cumulative code up to a given cell.id
export const useCumulativeCode = (cellId) => {
  const order = useSelector((state: RootState) => state.cells.order);
  const data = useSelector((state: RootState) => state.cells.data);

  return useMemo(() => {
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
    import _rct from "react";
    import _rctDOM from "react-dom";
    var show = (value) => {
      const root = document.querySelector('#root');

      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _rctDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      }
      else {
        root.innerHTML = value;
      }
    }
    `;
    const showFuncNoop = "var show = () => {}";

    const cumulativeCode: string[] = [];
    for (const cell of orderedCells) {
      if (cell.type === "code") {
        if (cell.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(cell.content);
      }
      if (cell.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }, [order, data, cellId]);
};
