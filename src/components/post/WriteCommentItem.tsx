import { useState } from 'react';
import { postComments, postNotifications } from '../../api/post/post';
import CommentEditor from '../editor/CommentEditor';

interface Theme {
  name: string;
}

export default function WriteCommentItem({
  channelId,
  postId,
  postUserId,
  theme,
}: {
  channelId: string;
  postId: string;
  postUserId: string;
  theme: Theme;
}) {
  const [comment, setComment] = useState('');
  const changeCommentHandler = (value: string) => {
    setComment(value);
  };
  // const changeCommentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setComment(e.target.value);
  // };

  // const [image, setImage] = useState<string | null>(null);
  //const [imageFile, setImageFile] = useState<File | null>(null);

  // const imageInputRef = useRef<HTMLInputElement>(null);

  // const onImageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const file = e.target.files[0];
  //   const imageFileUrl = URL.createObjectURL(file);

  //   setImage(imageFileUrl);
  //   //setImageFile(file);
  //   //setImageUrl(file);

  //   if (!imageInputRef.current) return;
  //   imageInputRef.current.value = '';
  // };

  // const onImageUploadButtonClickHandler = () => {
  //   if (!imageInputRef.current) return;
  //   imageInputRef.current.click();
  // };

  // const onImageCloseButtonClickHandler = () => {
  //   if (!imageInputRef.current) return;
  //   imageInputRef.current.value = '';

  //   setImage('');
  //   //setImageFile(null);
  //   //setImageUrl(null);
  // };

  const createNewComment = async () => {
    try {
      const { data } = await postComments(postId, comment);
      console.log(data);
      sendCommentNotification(data._id);
    } catch (e) {
      console.log(e instanceof Error && e.message);
    }
  };

  const sendCommentNotification = async (notificationTypeId: string) => {
    try {
      const { data } = await postNotifications(
        'COMMENT',
        notificationTypeId,
        postUserId,
        postId
      );
      console.log(data);
      setComment('');
      // navigate(`/channel/${channelId}/post/${postId}`);
      window.location.href = `/channel/${channelId}/post/${postId}`;
    } catch (e) {
      console.log(e instanceof Error && e.message);
    }
  };

  // const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // const formData = new FormData();

  //   // formData.append('postId', postId);
  //   // formData.append(
  //   //   'comment',
  //   //   JSON.stringify({
  //   //     content: comment,
  //   //     image: null,
  //   //   })
  //   // );

  //   // formData.append(
  //   //   'request',
  //   //   new Blob(
  //   //     [
  //   //       JSON.stringify({
  //   //         title: title,
  //   //         content: content,
  //   //       }),
  //   //     ],
  //   //     { type: 'application/json' }
  //   //   )
  //   // );

  //   createNewComment();
  // };

  const submitHandler = (e: React.FormEvent<Element>) => {
    e.preventDefault();

    createNewComment();
  };

  return (
    <>
      <div
        className={`relative w-full h-auto rounded-[5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${
          theme.name === 'Dark' ? 'bg-[#2d2d2d]' : 'bg-[#ffffff]'
        }`}
      >
        <div>
          {/* <form onSubmit={(e) => submitHandler(e)}> */}
          {/* <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => changeCommentHandler(e)}
            placeholder="댓글을 작성해 주세요"
            className="w-full h-[57px] text-lg p-[22px] resize-none outline-none"
          /> */}

          {/* <div className="w-full h-[50px] flex justify-end items-center">
            <div className="pr-[33px]">
              {channelId === '1' && <CodeEditIcon />}
              <ImageIcon onClick={onImageUploadButtonClickHandler} />
              <input
                type="file"
                accept="image/*"
                multiple={false}
                ref={imageInputRef}
                onChange={onImageChangeHandler}
                className="hidden"
              />
              {image && (
                <div className="absolute top-[117px] left-0 flex my-1 gap-2.5 p-5 rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                  <div className="w-full relative ">
                    <img src={image} alt="image" className="w-full" />
                    <div
                      onClick={onImageCloseButtonClickHandler}
                      className="absolute top-2 right-2 cursor-pointer"
                    >
                      close
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="pr-[10px]">
              <Button value="댓글 달기" className="button-style3" />
            </div>
          </div> */}
          {/* </form> */}
        </div>
        <CommentEditor
          channelId={channelId}
          submitHandler={submitHandler}
          onChange={(v) => changeCommentHandler(v)}
          showCodeButton={true}
          theme={theme}
        />
      </div>
    </>
  );
}
