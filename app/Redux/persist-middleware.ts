import { Action, Middleware } from "@reduxjs/toolkit";
import { deleteCell, insertCellAfter, moveCell, saveCellsToNoteAction, updateCell } from "./Slices/cellSlice";
import { AppDispatch, RootState } from "./store";

//@ts-ignore
const persistMiddleware: Middleware<{}, RootState, AppDispatch> =
  ({ dispatch, getState }) =>
  (next: (action: Action) => void) => {
    let timer;
    return (action: Action) => {
      next(action);
      const selectedNoteId = getState().cells.selectedNoteId;
      if ([insertCellAfter.type, updateCell.type, moveCell.type, deleteCell.type].includes(action.type) && selectedNoteId) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          dispatch(saveCellsToNoteAction(selectedNoteId));
        }, 250);
      }
    };
  };

export default persistMiddleware;
