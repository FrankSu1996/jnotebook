"use client";

import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import "@/components/ui/styles/TextEditor.css";
import { Button } from "./button";

export const TextEditor: React.FC = () => {
  const [value, setValue] = useState<string | undefined>("# Header");
  const [editing, setEditing] = useState(false);
  const mdEditorRef = useRef<HTMLDivElement | null>(null);

  const { theme } = useTheme();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (mdEditorRef.current && event.target && mdEditorRef.current.contains(event.target as Node)) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => document.removeEventListener("click", listener, { capture: true });
  }, []);

  const editorToRender = editing ? (
    <div className="container text-editor" ref={mdEditorRef}>
      <MDEditor value={value} onChange={setValue} />
    </div>
  ) : (
    <div onClick={() => setEditing(true)} className="container text-editor">
      <MDEditor.Markdown source={"# Header"} />
    </div>
  );

  return (
    <div data-color-mode={theme}>
      {editorToRender}
      <Button>Redux test</Button>
    </div>
  );
};
