import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";

export const CodeEditor = () => {
  const { theme, systemTheme } = useTheme();
  let appliedTheme;
  if (theme === "system")
    appliedTheme = systemTheme === "dark" ? "vs-dark" : "light";
  else {
    appliedTheme = theme === "dark" ? "vs-dark" : "light";
  }
  return (
    <MonacoEditor
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
