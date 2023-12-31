"use client";

import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { editor, KeyMod, KeyCode, Range } from "monaco-editor";
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { Button } from "../button";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCell, moveCell } from "@/app/Redux/Slices/cellSlice";
import { selectCursorInsideCodeEditor, setCursorInsideCodeEditor } from "@/app/Redux/Slices/uiSlice";
import { RootState } from "@/app/Redux/store";

interface EditorProps {
  id: string;
  initialValue: string;
  onChange(value: string | undefined, event: editor.IModelContentChangedEvent): void;
}

export const CodeEditor: React.FC<EditorProps> = ({ initialValue, onChange, id }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const editorWrapperRef = useRef<HTMLDivElement | null>(null);
  const isCursorInside = useSelector((state: RootState) => selectCursorInsideCodeEditor(state, id));
  const dispatch = useDispatch();

  useEffect(() => {
    function handleOutsideClick(event) {
      if (editorWrapperRef.current && !editorWrapperRef.current.contains(event.target)) {
        dispatch(setCursorInsideCodeEditor({ id, cursorIsInside: false }));
      } else {
        dispatch(setCursorInsideCodeEditor({ id, cursorIsInside: true }));
      }
    }

    function handleKeyPress(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        onFormatClick();
      }
    }

    if (isCursorInside) {
      window.addEventListener("keydown", handleKeyPress);
    }

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch, id, isCursorInside]);

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
    editorRef.current.addAction({
      id: "move-cell-down",
      label: "Move Cell Down",
      keybindings: [KeyMod.CtrlCmd | KeyCode.DownArrow],
      run: () => {
        dispatch(moveCell({ id, direction: "down" }));
      },
    });
    editorRef.current.addAction({
      id: "move-cell-up",
      label: "Move Cell Up",
      keybindings: [KeyMod.CtrlCmd | KeyCode.UpArrow],
      run: () => {
        dispatch(moveCell({ id, direction: "up" }));
      },
    });

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
    <div ref={editorWrapperRef} className="relative h-full w-[calc(100%-10px)]">
      <MonacoEditor
        onMount={handleEditorDidMount}
        onChange={onChange}
        value={initialValue}
        height="100%"
        language="javascript"
        theme={appliedTheme}
        options={{
          scrollbar: {
            alwaysConsumeMouseWheel: false,
          },
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
