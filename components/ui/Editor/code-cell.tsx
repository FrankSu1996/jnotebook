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
