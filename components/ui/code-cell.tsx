"use client";

import { useState, useEffect } from "react";
import { CodeEditor } from "@/components/ui/code-editor";
import { Preview } from "@/components/ui/preview";
import { bundleRawCode } from "@/lib/bundler";
import { Resizable } from "./resizable";

export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundleRawCode(input);
      setCode(output);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div className="h-full flex flex-row">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue=""
            onChange={(value, ev) => {
              if (value) setInput(value);
            }}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};
