"use client";

import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "@/components/ui/styles/Resizable.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCodeCellHeight, selectCodeCellWidth, setCodeCellHeight, setCodeCellWidth } from "@/app/Redux/Slices/cellSlice";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
  cellId: string;
}

export const Resizable: React.FC<ResizableProps> = ({ direction, children, cellId }) => {
  const [innerHeight, setInnerHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const width = useSelector(selectCodeCellWidth(cellId));
  const height = useSelector(selectCodeCellHeight(cellId));
  const dispatch = useDispatch();

  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);
    dispatch(setCodeCellWidth({ id: cellId, width: window.innerWidth * 0.425 }));
    dispatch(setCodeCellHeight({ id: cellId, height: 300 }));
  }, [cellId, dispatch]);

  if (direction === "horizontal") {
    resizableProps = {
      className: "flex flex-row",
      height: Infinity,
      width,
      resizeHandles: ["e"],
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      onResizeStop: (event, data) => {
        dispatch(setCodeCellWidth({ id: cellId, width: data.size.width }));
        data.node.style.marginBottom = "300px";
      },
    };
  } else {
    resizableProps = {
      height,
      width: Infinity,
      resizeHandles: ["s"],
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      onResizeStop: (event, data) => {
        dispatch(setCodeCellHeight({ id: cellId, height: data.size.height }));
      },
    };
  }

  if (innerHeight === 0) return <div></div>;

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
