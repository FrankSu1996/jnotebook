import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { editor } from "monaco-editor";
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { Button } from "./button";

import { useRef } from "react";

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
    <div>
      <Button onClick={onFormatClick}>format</Button>
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
