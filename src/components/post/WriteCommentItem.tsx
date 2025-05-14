import { useRef, useState } from 'react';
import { postComments, postNotifications } from '../../api/post/post';
import CommentEditor from '../editor/CommentEditor';
import { useNavigate } from 'react-router-dom';

export default function WriteCommentItem({
  channelId,
  postId,
  postUserId,
  updateReloadTrigger,
}: {
  channelId: string;
  postId: string;
  postUserId: string;
  updateReloadTrigger: () => void;
}) {
  const navigate = useNavigate();

  // 입력한 댓글 상태
  const [comment, setComment] = useState('');
  const changeCommentHandler = (value: string) => {
    setComment(value);
  };

  // 댓글 작성한 후, 댓글 에디터 부분을 초기화하기 위한 트리거
  const [resetTrigger, setResetTrigger] = useState(0);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 댓글 작성한 후, 알림 전송하기
  const createNewComment = async () => {
    try {
      const { data } = await postComments(postId, comment);
      console.log(data);
      updateReloadTrigger();
      setResetTrigger((resetTrigger) => resetTrigger + 1);
      setComment('');
      sendCommentNotification(data._id);

      navigate(`/channel/${channelId}/post/${postId}`, {
        state: { scrollToComment: true },
      });
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
        className="relative w-full h-auto rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        ref={bottomRef}
      >
        <CommentEditor
          bottomRef={bottomRef}
          channelId={channelId}
          resetTrigger={resetTrigger}
          submitHandler={submitHandler}
          onChange={(v) => changeCommentHandler(v)}
          showCodeButton={true}
        />
      </div>
    </>
  );
}
