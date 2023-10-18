"use client";
import { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "@/plugins/unpkg-path-plugin";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchPlugin } from "@/plugins/fetch-plugin";
import { CodeEditor } from "@/components/ui/code-editor";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Preview } from "@/components/ui/preview";

export default function Page() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const esbuildInitialized = useRef<boolean>(false);

  const onClick = async () => {
    if (!esbuildInitialized.current) return;

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    setCode(result.outputFiles[0].text);
  };

  const startService = async () => {
    if (!esbuildInitialized.current) {
      await esbuild.initialize({
        wasmURL: "https://unpkg.com/esbuild-wasm@latest/esbuild.wasm",
      });
      esbuildInitialized.current = true;
    }
  };

  useEffect(() => {
    startService();
  }, []);

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
}
