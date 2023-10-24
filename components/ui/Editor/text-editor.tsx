"use client";

import MDEditor, { ICommand, commands } from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import "@/components/ui/styles/TextEditor.css";
import { Cell, deleteCell, moveCell, updateCell } from "@/app/Redux/Slices/cellSlice";
import { useDispatch } from "react-redux";
import { Button } from "../button";

interface TextEditorProps {
  cell: Cell;
}

export const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const mdEditorRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
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
        startedInsideEditor = true;
      } else {
        startedInsideEditor = false;
      }
    };

    const mouseUpListener = (event: MouseEvent) => {
      if (startedInsideEditor && mdEditorRef.current && event.target && !mdEditorRef.current.contains(event.target as Node)) {
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
  }, [dispatch]);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === "ArrowUp") {
        event.preventDefault();
        event.stopPropagation();
        dispatch(moveCell({ id: cell.id, direction: "up" }));
        return;
      } else if (event.ctrlKey && event.key === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();
        dispatch(moveCell({ id: cell.id, direction: "down" }));
      }
    }
    if (editing) {
      document.addEventListener("keydown", handleKeyPress);
    } else {
      document.removeEventListener("keydown", handleKeyPress);
    }

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [editing, cell.id, dispatch]);

  const editorToRender = editing ? (
    <div className="text-editor" ref={mdEditorRef}>
      <MDEditor value={cell.content} onChange={(v) => dispatch(updateCell({ id: cell.id, content: v || "" }))} className="h-32" />
    </div>
  ) : (
    <div onClick={() => setEditing(true)} className="text-editor">
      <MDEditor.Markdown source={cell.content || "Click to edit"} className="p-6 h-full" />
    </div>
  );

  return <div data-color-mode={theme}>{editorToRender}</div>;
};
