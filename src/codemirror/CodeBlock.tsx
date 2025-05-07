// CodeBlock.tsx
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";

interface CodeBlockProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      width="826px"
      height="104px"
      extensions={[javascript()]}
      theme={oneDark}
      basicSetup={{ lineNumbers: false }}
      onChange={(val) => onChange(val)}
      className="bg-gray-700"
    />
  );
};

export default CodeBlock;
