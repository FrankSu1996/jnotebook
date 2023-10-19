"use client";

import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";

export const TextEditor: React.FC = () => {
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = () => {
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => document.removeEventListener("click", listener, { capture: true });
  }, []);

  if (editing) {
    return (
      <div className="container">
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
