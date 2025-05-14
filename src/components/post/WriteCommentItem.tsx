import { useState } from 'react';
import { postComments, postNotifications } from '../../api/post/post';
import CommentEditor from '../editor/CommentEditor';
import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';

export default function WriteCommentItem({
  channelId,
  postId,
  postUserId,
  theme,
  updateReloadTrigger,
}: {
  channelId: string;
  postId: string;
  postUserId: string;
  theme: Theme;
  updateReloadTrigger: () => void;
}) {
  // 입력한 댓글 상태
  const [comment, setComment] = useState('');
  const changeCommentHandler = (value: string) => {
    setComment(value);
  };

  // 댓글 작성한 후, 댓글 에디터 부분을 초기화하기 위한 트리거
  const [resetTrigger, setResetTrigger] = useState(0);

  // 댓글 작성한 후, 알림 전송하기
  const createNewComment = async () => {
    try {
      const { data } = await postComments(postId, comment);
      console.log(data);
      updateReloadTrigger();
      setResetTrigger((resetTrigger) => resetTrigger + 1);
      setComment('');
      sendCommentNotification(data._id);
    } catch (e) {
      console.log(e instanceof Error && e.message);
    }
  };

  // 댓글 알림 전송하기
  const sendCommentNotification = async (notificationTypeId: string) => {
    try {
      const { data } = await postNotifications(
        'COMMENT',
        notificationTypeId,
        postUserId,
        postId
      );
      console.log(data);

      //window.location.href = `/channel/${channelId}/post/${postId}`;
    } catch (e) {
      console.log(e instanceof Error && e.message);
    }
  };

  const submitHandler = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    createNewComment();
  };

  return (
    <>
      <div
        className={`relative w-full h-auto rounded-[5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${
          dark(theme)
            ? 'bg-[#2d2d2d] text-[#ffffff]'
            : 'bg-[#ffffff] text-[#111111]'
        }`}
      >
        <CommentEditor
          channelId={channelId}
          resetTrigger={resetTrigger}
          submitHandler={submitHandler}
          onChange={(v) => changeCommentHandler(v)}
          showCodeButton={true}
          theme={theme}
        />
      </div>
    </>
  );
}
