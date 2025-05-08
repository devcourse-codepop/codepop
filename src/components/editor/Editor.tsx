// components/editor/Editor.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import EditorToolbar from "./EditorToolbar";
import "../../css/editor.css";
// import { useEffect } from "react";

interface Props {
  onChange: (html: string) => void;
}

export default function Editor({ onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>내용을 입력하세요...</p>",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="p-4 rounded-lg min-h-[100px] h-auto mb-12">
      <EditorToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose max-w-none [&_.ProseMirror]:outline-none  [&_.ProseMirror]:min-h-[450px] [&_.ProseMirror]:h-auto"
      />
    </div>
  );
}
