"use client";

import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { editor } from "monaco-editor";
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { Button } from "./button";

import { useEffect, useRef, useState } from "react";

interface EditorProps {
  initialValue: string;
  onChange(
    value: string | undefined,
    event: editor.IModelContentChangedEvent
  ): void;
}

export const CodeEditor: React.FC<EditorProps> = ({
  initialValue,
  onChange,
}) => {
  const editorRef = useRef<any>();
  const [isCursorInside, setIsCursorInside] = useState(false);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        onFormatClick();
      }
    }

    if (isCursorInside) {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isCursorInside]);

  const { theme, systemTheme } = useTheme();
  let appliedTheme;
  if (theme === "system")
    appliedTheme = systemTheme === "dark" ? "vs-dark" : "light";
  else {
    appliedTheme = theme === "dark" ? "vs-dark" : "light";
  }

  const onFormatClick = async () => {
    const unformatted = editorRef.current?.getModel().getValue();

    const formatted = await prettier.format(unformatted, {
      parser: "babel",
      plugins: [parserBabel, prettierPluginEstree],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    editorRef.current.setValue(formatted);
  };

  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setIsCursorInside(true)}
      onMouseLeave={() => setIsCursorInside(false)}
    >
      <Button
        onClick={onFormatClick}
        variant={"ghost"}
        size={"sm"}
        className="absolute top-1 right-1 z-20 opacity-0 transition-opacity hover:opacity-100"
      >
        Format
      </Button>
      <MonacoEditor
        onMount={(editor: editor.IStandaloneCodeEditor) =>
          (editorRef.current = editor)
        }
        onChange={onChange}
        value={initialValue}
        height="500px"
        language="javascript"
        theme={appliedTheme}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};
