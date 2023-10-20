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
    let startedInsideEditor = false;
    const clickListener = (event: MouseEvent) => {
      if (startedInsideEditor) {
        // Reset the flag for future clicks
        startedInsideEditor = false;
        return;
      }

      if (mdEditorRef.current && event.target && !mdEditorRef.current.contains(event.target as Node)) {
        setEditing(false);
      }
    };

    const mouseDownListener = (event: MouseEvent) => {
      if (mdEditorRef.current && event.target && mdEditorRef.current.contains(event.target as Node)) {
        console.log("Clicked started inside");
        startedInsideEditor = true;
      } else {
        startedInsideEditor = false;
      }
    };

    const mouseUpListener = (event: MouseEvent) => {
      if (startedInsideEditor && mdEditorRef.current && event.target && !mdEditorRef.current.contains(event.target as Node)) {
        console.log("click started inside and mouse up fired ");
        setEditing(true);
      }
    };

    document.addEventListener("click", clickListener, { capture: true });
    document.addEventListener("mousedown", mouseDownListener);
    document.addEventListener("mouseup", mouseUpListener);

    return () => {
      document.removeEventListener("mousedown", mouseDownListener);
      document.removeEventListener("mouseup", mouseUpListener);
      document.removeEventListener("click", clickListener, { capture: true });
    };
  }, []);

  const editorToRender = editing ? (
    <div className="text-editor" ref={mdEditorRef}>
      <MDEditor value={value} onChange={setValue} />
    </div>
  ) : (
    <div onClick={() => setEditing(true)} className="text-editor">
      <MDEditor.Markdown source={value} className="p-6" />
    </div>
  );

  return <div data-color-mode={theme}>{editorToRender}</div>;
};
