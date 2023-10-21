"use client";

import { useSelector } from "react-redux";
import { selectOrder, selectData } from "@/app/Redux/Slices/cellSlice";
import { CellListItem } from "./cell-list-item";
import { AddCell } from "../add-cell";
import { Fragment } from "react";

export const CellList: React.FC = () => {
  const order = useSelector(selectOrder);
  const data = useSelector(selectData);

  const cellList = order?.map((id) => {
    return data[id];
  });

  const renderedCells = cellList?.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <AddCell nextCellId={cell.id} />
        <CellListItem cell={cell} />
      </Fragment>
    );
  });

  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} forceVisible={cellList.length === 0} />
    </div>
  );
};
