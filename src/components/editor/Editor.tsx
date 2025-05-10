import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./EditorToolbar";

import { CustomImage } from "./extensions/CustomImage";
import { useState } from "react";
import PollCreator from "../poll/PollCreater";

interface Props {
  onChange: (html: string) => void;
  onPollCreate?: (options: { id: number; text: string }[]) => void; // 🔹 추가
  onImageSelect?: (file: File) => void; // 추가
  showPollButton?: boolean;
  showCodeButton?: boolean;
  disableMinHeight?: boolean;
}

export default function Editor({
  onChange,
  onPollCreate,
  onImageSelect,
  showPollButton = false,
  showCodeButton = false,
  disableMinHeight = false,
}: Props) {
  const editor = useEditor({
    extensions: [StarterKit, CustomImage],
    content: "<p></p>",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const [showPollCreator, setShowPollCreator] = useState(false);

  return (
    <div className="p-4 rounded-lg min-h-[100px] h-auto mb-12">
      <EditorToolbar
        editor={editor}
        onTogglePoll={() => setShowPollCreator((prev) => !prev)}
        onImageSelect={onImageSelect}
        showPollButton={showPollButton}
        showCodeButton={showCodeButton}
      />
      <EditorContent
        editor={editor}
        className={`
        prose max-w-none [&_.ProseMirror]:outline-none
        ${disableMinHeight ? "" : "[&_.ProseMirror]:min-h-[365px]"}
        [&_.ProseMirror]:h-auto

        [&_.ProseMirror_pre]:bg-[#ececec]
        [&_.ProseMirror_pre]:p-4
        [&_.ProseMirror_pre]:rounded-lg
        [&_.ProseMirror_pre]:font-mono
        [&_.ProseMirror_pre]:whitespace-pre-wrap

        [&_.ProseMirror_img]:max-w-[30%]
        [&_.ProseMirror_img]:h-auto
        `}
      />

      {showPollCreator && onPollCreate && (
        <PollCreator onCreate={onPollCreate} />
      )}
    </div>
  );
}
