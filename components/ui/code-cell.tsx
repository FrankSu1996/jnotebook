"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/ui/code-editor";
import { Preview } from "@/components/ui/preview";
import { bundleRawCode } from "@/lib/bundler";
import { Resizable } from "./resizable";

export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundleRawCode(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div className="h-full flex flex-row">
        <CodeEditor
          initialValue=""
          onChange={(value, ev) => {
            if (value) setInput(value);
          }}
        />
        <Preview code={code} />
      </div>
    </Resizable>
  );
};
