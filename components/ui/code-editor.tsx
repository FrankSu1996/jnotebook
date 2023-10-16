import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { editor } from "monaco-editor";

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
  const { theme, systemTheme } = useTheme();
  let appliedTheme;
  if (theme === "system")
    appliedTheme = systemTheme === "dark" ? "vs-dark" : "light";
  else {
    appliedTheme = theme === "dark" ? "vs-dark" : "light";
  }
  return (
    <MonacoEditor
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
  );
};
