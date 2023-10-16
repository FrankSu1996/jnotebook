"use client";
import { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "@/plugins/unpkg-path-plugin";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchPlugin } from "@/plugins/fetch-plugin";

export default function Page() {
  const iframeRef = useRef<any>();
  const [input, setInput] = useState("");

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
    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            eval(event.data);
          }, false);
        </script>
      </body>
    </html>
  `;

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
    <div className="w-1/2">
      <Textarea
        onChange={(e) => setInput(e.target.value)}
        color="blue"
      ></Textarea>
      <div>
        <Button onClick={onClick}>Submit</Button>
      </div>
      <iframe
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
        style={{ border: "1px solid" }}
      ></iframe>
    </div>
  );
}
