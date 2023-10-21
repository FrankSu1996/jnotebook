"use client";

import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { editor, languages } from "monaco-editor";
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { Button } from "../button";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";

import { useEffect, useRef, useState } from "react";

interface EditorProps {
  initialValue: string;
  onChange(value: string | undefined, event: editor.IModelContentChangedEvent): void;
}

export const CodeEditor: React.FC<EditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
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
  if (theme === "system") appliedTheme = systemTheme === "dark" ? "vs-dark" : "light";
  else {
    appliedTheme = theme === "dark" ? "vs-dark" : "light";
  }

  const onFormatClick = async () => {
    const model = editorRef.current?.getModel();
    if (model) {
      const unformatted = model.getValue();
      const selection = editorRef.current?.getSelection();

      const formatted = await prettier.format(unformatted!, {
        parser: "babel",
        plugins: [parserBabel, prettierPluginEstree],
        useTabs: false,
        semi: true,
        singleQuote: true,
      });
      editorRef.current?.setValue(formatted.replace(/\n$/, ""));
      if (selection) editorRef.current?.setSelection(selection);
    }
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    const babelParse = (code) =>
      parse(code, {
        sourceType: "module",
        plugins: ["jsx"],
        errorRecovery: true,
      });

    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      // @ts-ignore
      window.monaco,
      babelParse,
      traverse,
      editor,
    );

    monacoJSXHighlighter.highlightOnDidChangeModelContent(100);
    // Activate JSX commenting
    monacoJSXHighlighter.addJSXCommentCommand();
  };

  return (
    <div className="relative h-full w-[calc(100%-10px)]" onMouseEnter={() => setIsCursorInside(true)} onMouseLeave={() => setIsCursorInside(false)}>
      <Button onClick={onFormatClick} variant={"ghost"} size={"sm"} className="absolute top-0 right-0 opacity-0 transition-opacity hover:opacity-100">
        Format
      </Button>
      <MonacoEditor
        onMount={handleEditorDidMount}
        onChange={onChange}
        value={initialValue}
        height="100%"
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
