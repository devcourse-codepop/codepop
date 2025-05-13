import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
// import { lowlight } from 'lowlight/lib/common';
import Placeholder from '@tiptap/extension-placeholder';
import Button from '../common/Button';
import CommentEditorToolbar from './CommentEditorToolbar';

interface Theme {
  name: string;
}

interface Props {
  channelId: string;
  submitHandler: (e: React.FormEvent<Element>) => void;
  onChange: (html: string) => void;
  showCodeButton?: boolean;
  disableMinHeight?: boolean;
  theme: Theme;
}

export default function CommentEditor({
  channelId,
  submitHandler,
  onChange,
  showCodeButton = false,
  disableMinHeight = false,
  theme,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '댓글을 작성해 주세요',
      }),
    ],
    // extensions: [
    //   StarterKit.configure({
    //     codeBlock: false,
    //   }),
    //   CodeBlockLowlight.configure({
    //     lowlight,
    //   }),
    // ],

    // content: '',
    content: '<p></p>',
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className=" rounded-[5px] min-h-[100px] h-auto">
      <EditorContent
        editor={editor}
        className={`
        prose max-w-none [&_.ProseMirror]:outline-none
        [&_.ProseMirror]:h-auto
        ${disableMinHeight ? '' : '[&_.ProseMirror]:min-h-[50px]'}

        [&_.ProseMirror_pre]:bg-[#ececec]
        [&_.ProseMirror_pre]:p-4
        [&_.ProseMirror_pre]:rounded-lg
        [&_.ProseMirror_pre]:font-mono
        [&_.ProseMirror_pre]:whitespace-pre-wrap

        p-6
        pb-3
        `}
      />
      <div className="w-full h-[50px] flex justify-end items-center gap-6 pr-6 pb-4">
        {channelId === '1' && (
          <CommentEditorToolbar
            editor={editor}
            showCodeButton={showCodeButton}
          />
        )}
        {channelId !== '1' && <CommentEditorToolbar editor={editor} />}

        <Button
          value="댓글 달기"
          className={`button-style3 ${
            theme.name === 'Dark' ? 'bg-[#ffffff] text-[#111111]' : ''
          }`}
          onClick={(e) => submitHandler(e)}
        />
      </div>
    </div>
  );
}
