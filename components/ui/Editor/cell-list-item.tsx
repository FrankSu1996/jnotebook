"use client";

import { Cell } from "@/app/Redux/Slices/cellSlice";
import { CodeCell } from "./code-cell";
import { TextEditor } from "./text-editor";
import { ActionBar } from "../action-bar";

interface CellListItemProps {
  cell: Cell;
}

export const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child;
  if (cell.type === "code") {
    child = (
      <>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
      </>
    );
  }

  return (
    <div className="relative pb-5">
      <div cell-list>
        <ActionBar id={cell.id} />
        {child}
      </div>
    </div>
  );
};
