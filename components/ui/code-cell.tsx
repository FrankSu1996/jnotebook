"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/ui/code-editor";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Preview } from "@/components/ui/preview";
import { bundleRawCode } from "@/lib/bundler";

export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundleRawCode(input);
    setCode(output);
  };

  return (
    <div>
      <ThemeToggle />
      <CodeEditor
        initialValue=""
        onChange={(value, ev) => {
          if (value) setInput(value);
        }}
      />
      <div>
        <Button onClick={onClick}>Submit</Button>
      </div>
      <Preview code={code} />
    </div>
  );
};
