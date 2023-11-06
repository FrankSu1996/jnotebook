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
  selectedNoteId: string | null;
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
  codeCellDimensions: {
    [key: string]: {
      width: number;
      height: number;
    };
  };
}

const initialState: CellState = {
  selectedNoteId: null,
  loading: false,
  error: null,
  order: [],
  data: {},
  bundledCode: {},
  codeCellDimensions: {},
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
export const saveCellsToNoteAction = createAsyncThunk<void, string, { state: RootState }>("cells/saveCells", async (fileId: string, { getState }) => {
  const {
    cells: { data, order },
  } = getState();

  const cells = order.map((id) => data[id]);
  const body: POSTCellsRequestBody = {
    cells,
    fileId,
  };
  const response = await fetch("/api/cells", { method: "post", body: JSON.stringify(body) });
  const { data: supabaseResponse, error } = await response.json();
});

export const loadCellsFromNoteAction = createAsyncThunk<void, string, { state: RootState }>(
  "cells/loadCells",
  async (noteId: string, { dispatch }) => {
    const response = await fetch(`/api/cells?id=${noteId}`, { method: "get" });
    const { data: fetchedNote, error } = await response.json();
    const cells = fetchedNote[0].cells;
    dispatch(setSelectedNoteId(noteId));
  },
);

export const cellSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    setSelectedNoteId: (state, action) => {
      state.selectedNoteId = action.payload;
    },
    updateCell: (state, action: { payload: { id: string; content: string } }) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell: (state, action: { payload: string }) => {
      delete state.data[action.payload];
      // Remove the item from the order array
      state.order = state.order.filter((item) => item !== action.payload);
      delete state.codeCellDimensions[action.payload];
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
      const cellId = action.payload.newCellId;
      state.codeCellDimensions[cellId] = {
        width: 0,
        height: 0,
      };
    },
    setCodeCellWidth: (
      state,
      action: {
        payload: { id: string; width: number };
      },
    ) => {
      state.codeCellDimensions[action.payload.id].width = action.payload.width;
    },
    setCodeCellHeight: (
      state,
      action: {
        payload: { id: string; height: number };
      },
    ) => {
      state.codeCellDimensions[action.payload.id].height = action.payload.height;
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

export const { deleteCell, insertCellAfter, moveCell, updateCell, setCodeCellWidth, setSelectedNoteId, setCodeCellHeight } = cellSlice.actions;

export default cellSlice.reducer;
export const selectData = (state: RootState) => state.cells.data;
export const selectOrder = (state: RootState) => state.cells.order;
export const selectBundle = (id) => (state: RootState) => state.cells.bundledCode[id];
export const selectSelectedNoteId = (state: RootState) => state.cells.selectedNoteId;
export const selectCodeCellWidth = (cellId) => (state: RootState) => state.cells.codeCellDimensions[cellId].width;
export const selectCodeCellHeight = (cellId) => (state: RootState) => state.cells.codeCellDimensions[cellId].height;

// Memoized selector to get cumulative code up to a given cell.id
export const useCumulativeCode = (cellId) => {
  const order = useSelector((state: RootState) => state.cells.order);
  const data = useSelector((state: RootState) => state.cells.data);

  return useMemo(() => {
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
    import _rct from "react";
    import _rctDOM from "react-dom";
    import 'bulmaswatch/default/bulmaswatch.min.css';
    var show = (value) => {
      const root = document.querySelector('#root');

      // Check if value is a React component
      if (typeof value === 'function' && !value.$$typeof) {
        value = _rct.createElement(value);  // Convert component to a React element
      }

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
