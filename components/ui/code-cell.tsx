"use client";

import { useState, useEffect } from "react";
import { CodeEditor } from "@/components/ui/code-editor";
import { Preview } from "@/components/ui/preview";
import { bundleRawCode } from "@/lib/bundler";
import { Resizable } from "./resizable";

export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundleRawCode(input);
      if (output?.code) setCode(output.code);
      if (output?.error) setError(output.error);
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
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};
