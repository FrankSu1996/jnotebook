"use client";

import { useState, useEffect } from "react";
import { CodeEditor } from "@/components/ui/Editor/code-editor";
import { Preview } from "@/components/ui/Editor/preview";
import { bundleRawCode } from "@/lib/bundler";
import { Resizable } from "../resizable";
import React from "react";
import { Cell, updateCell } from "@/app/Redux/Slices/cellSlice";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

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
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundleRawCode(cell.content);
      if (output?.code) {
        setCode(output.code);
      }
      if (output?.error) setError(output.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

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
        <MemoizedPreview code={code} error={error} />
      </div>
    </Resizable>
  );
};
