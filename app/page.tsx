"use client";
import { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "@/unpkg-path-plugin";
import { Button } from "@/components/ui/button";

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
      plugins: [unpkgPathPlugin()],
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
        wasmURL: "/esbuild.wasm",
      });
      esbuildInitialized.current = true;
    }
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <div>
      <textarea
        onChange={(e) => setInput(e.target.value)}
        name=""
        id=""
        cols={30}
        rows={10}
      ></textarea>
      <div>
        <Button onClick={onClick}>Submit</Button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}
