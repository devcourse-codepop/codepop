import { Editor } from "@tiptap/react";
import CodeEditIcon from "../icon/CodeEditIcon";
import ImageIcon from "../icon/ImageIcon";
import BoldIcon from "../icon/BoldIcon";
import ItalicIcon from "../icon/ItalicIcon";
import VoteIcon from "../icon/VoteIcon";

interface Props {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: Props) {
  if (!editor) return null;

  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`cursor-pointer rounded-[5px] ${
          editor.isActive("bold") ? "font-bold bg-blue-400" : ""
        }`}
      >
        <BoldIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`cursor-pointer rounded-[5px] ${
          editor.isActive("italic") ? "italic bg-blue-400" : ""
        }`}
      >
        <ItalicIcon />
      </button>

      <button
        onClick={() => {
          editor.chain().focus().toggleCodeBlock().run();
        }}
        className={`cursor-pointer rounded-[5px] ${
          editor.isActive("codeBlock") ? "bg-blue-400" : ""
        }`}
      >
        <CodeEditIcon />
      </button>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result;
              if (typeof result === "string") {
                editor?.chain().focus().setImage({ src: result }).run();
              }
            };
            reader.readAsDataURL(file); // ✅ base64 URL 생성
          }
        }}
        className="hidden cursor-pointer rounded-[5px]"
        id="image-upload"
      />

      <label
        htmlFor="image-upload"
        className="cursor-pointer flex items-center justify-center"
      >
        <ImageIcon />
      </label>

      <button
        onClick={() => {
          editor
            .chain()
            .focus()
            .insertContent(`<PollCreator />`) // 또는 적절한 HTML/노드
            .run();
        }}
        className="cursor-pointer rounded-[5px] hover:bg-gray-200"
      >
        <VoteIcon />
      </button>
    </div>
  );
}
