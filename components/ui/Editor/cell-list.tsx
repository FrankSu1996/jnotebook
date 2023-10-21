"use client";

import { useSelector } from "react-redux";
import { selectOrder, selectData } from "@/app/Redux/Slices/cellSlice";
import { CellListItem } from "./cell-list-item";
import { useEffect } from "react";

export const CellList: React.FC = () => {
  const order = useSelector(selectOrder);
  const data = useSelector(selectData);

  const cellList = order?.map((id) => {
    return data[id];
  });

  const renderedCells = cellList?.map((cell) => {
    return <CellListItem key={cell.id} cell={cell} />;
  });

  return <div>{renderedCells}</div>;
};
