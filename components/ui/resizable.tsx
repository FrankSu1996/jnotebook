"use client";

import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "@/components/ui/styles/Resizable.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCodeCellWidth, setCodeCellWidth } from "@/app/Redux/Slices/cellSlice";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
  cellId: string;
}

export const Resizable: React.FC<ResizableProps> = ({ direction, children, cellId }) => {
  const [innerHeight, setInnerHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const width = useSelector(selectCodeCellWidth(cellId));
  const dispatch = useDispatch();

  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);
    dispatch(setCodeCellWidth({ id: cellId, width: window.innerWidth * 0.425 }));
  }, [cellId, dispatch]);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.5 < width) {
          dispatch(setCodeCellWidth({ id: cellId, width: window.innerWidth * 0.5 }));
        }
      }, 100);
    };

    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [width, cellId, dispatch]);

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
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
    };
  }

  if (innerHeight === 0) return <div></div>;

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
