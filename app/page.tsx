"use client";
import { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "@/plugins/unpkg-path-plugin";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchPlugin } from "@/plugins/fetch-plugin";
import { CodeEditor } from "@/components/ui/code-editor";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Page() {
  const iframeRef = useRef<any>();
  const [input, setInput] = useState("");

  const esbuildInitialized = useRef<boolean>(false);

  const onClick = async () => {
    if (!esbuildInitialized.current) return;

    // reset iframe html before bundling
    iframeRef.current.srcdoc = html;

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
            try {
              eval(event.data);
            } catch(err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
              console.error(err);
            }
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
    <div>
      <ThemeToggle />
      <CodeEditor
        initialValue=""
        onChange={(value, ev) => {
          if (value) setInput(value);
        }}
      />
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        color="blue"
      ></Textarea>
      <div>
        <Button onClick={onClick}>Submit</Button>
      </div>
      <iframe
        title="code preview"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
        style={{ border: "1px solid" }}
      ></iframe>
    </div>
  );
}
