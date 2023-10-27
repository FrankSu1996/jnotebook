"use client";

import { useSelector } from "react-redux";
import { selectOrder, selectData } from "@/app/Redux/Slices/cellSlice";
import { CellListItem } from "./cell-list-item";
import { AddCell } from "../add-cell";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import { selectAnyCursorInsideCodeEditor, selectCursorInsideCodeEditor, selectIsAnyDialogOpen } from "@/app/Redux/Slices/uiSlice";

export const CellList: React.FC = () => {
  const order = useSelector(selectOrder);
  const data = useSelector(selectData);
  const cursorInsideCodeEditor = useSelector(selectAnyCursorInsideCodeEditor);
  const isAnyDialogOpen = useSelector(selectIsAnyDialogOpen);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === "s" && !cursorInsideCodeEditor && !isAnyDialogOpen) {
        event.preventDefault();
        console.log("saving file");
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [cursorInsideCodeEditor, isAnyDialogOpen]);

  const cellList = order?.map((id) => {
    return data[id];
  });

  const renderedCells = cellList?.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <CellListItem cell={cell} />
        <AddCell previousCellId={cell.id} />
      </Fragment>
    );
  });

  return (
    <div className="cell-list">
      {order.length === 0 ? <h1 className="text-center pb-6">Select a cell type to start your notebook.</h1> : null}
      <AddCell previousCellId={null} forceVisible={cellList.length === 0} />
      {renderedCells}
    </div>
  );
};
