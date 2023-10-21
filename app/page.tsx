"use client";

import { Button } from "@/components/ui/button";
import { CellList } from "@/components/ui/Editor/cell-list";
import { useDispatch } from "react-redux";
import { insertCellBefore } from "./Redux/Slices/cellSlice";

export default function Page() {
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        onClick={() => {
          dispatch(insertCellBefore({ id: null, cellType: "code" }));
        }}
      >
        Redux test
      </Button>
      <CellList />
    </div>
  );
}
