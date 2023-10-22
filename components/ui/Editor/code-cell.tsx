"use client";

import { useState, useEffect, useRef } from "react";
import { Preview } from "@/components/ui/Editor/preview";
import { Resizable } from "../resizable";
import React from "react";
import { Cell, bundleCodeAction, selectBundle, updateCell, useCumulativeCode } from "@/app/Redux/Slices/cellSlice";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { AppDispatch, RootState } from "@/app/Redux/store";

const MemoizedPreview = React.memo(Preview);

interface CodeCellProps {
  cell: Cell;
}

const DynamicCodeEditor = dynamic(() => import("./code-editor").then((mod) => mod.CodeEditor), {
  ssr: false,
});

const IndeterminateProgress = () => {
  return (
    <div className="h-[0.75rem] w-full bg-gray-200 rounded relative overflow-hidden mt-2 mb-2" role="progressbar" aria-valuetext="Loading...">
      <div
        className="h-full absolute left-0 animate-indeterminate"
        style={{
          width: "50%",
          backgroundColor: "#00d1b2",
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent)",
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  );
};

export default IndeterminateProgress;

export const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const dispatch: AppDispatch = useDispatch();
  const bundle = useSelector(selectBundle(cell.id));
  const cumulativeCode = useCumulativeCode(cell.id);
  const bundleRef = useRef<any>();
  bundleRef.current = bundle;

  useEffect(() => {
    if (!bundleRef.current) {
      dispatch(bundleCodeAction({ cellId: cell.id, rawCode: cumulativeCode.join("\n") }));
      return;
    }

    const timer = setTimeout(async () => {
      dispatch(bundleCodeAction({ cellId: cell.id, rawCode: cumulativeCode.join("\n") }));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, cumulativeCode, cell.id]);

  return (
    <Resizable direction="vertical">
      <div className="h-full flex flex-row">
        <Resizable direction="horizontal">
          <DynamicCodeEditor
            id={cell.id}
            initialValue=""
            onChange={(value, ev) => {
              if (value) dispatch(updateCell({ id: cell.id, content: value }));
            }}
          />
        </Resizable>
        <div className="h-full flex-grow bg-white">
          {!bundle || bundle.loading ? (
            <div className="h-full w-full flex-grow flex flex-col bg-white justify-center pl-[5%] pr-[5%] animate-fade-in">
              <IndeterminateProgress />
              <IndeterminateProgress />
              <IndeterminateProgress />
            </div>
          ) : (
            <MemoizedPreview code={bundle.code} error={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
};
