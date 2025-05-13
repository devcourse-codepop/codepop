import { Editor } from '@tiptap/react';
import CodeEditIcon from '../icon/CodeEditIcon';

interface Theme {
  name: string;
}

interface Props {
  editor: Editor | null;
  showCodeButton?: boolean;
  theme: Theme;
}

export default function CommentEditorToolbar({
  editor,
  showCodeButton = false,
  theme,
}: Props) {
  if (!editor) return null;

  return (
    <div>
      {showCodeButton && (
        <button
          onClick={() => {
            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={`cursor-pointer rounded-[5px] 
          ${
            editor.isActive('codeBlock') ? 'bg-blue-400' : 'hover:bg-gray-200'
          }`}
        >
          <CodeEditIcon theme={theme} />
        </button>
      )}
    </div>
  );
}
