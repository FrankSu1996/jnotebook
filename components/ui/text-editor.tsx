"use client";

import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";

export const TextEditor: React.FC = () => {
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
  const [editing, setEditing] = useState(false);
  const mdEditorRef = useRef<HTMLDivElement | null>(null);

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

  if (editing) {
    return (
      <div className="container" ref={mdEditorRef}>
        <MDEditor value={value} onChange={setValue} />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="container">
      <MDEditor.Markdown source={"# Header"} />
    </div>
  );
};
