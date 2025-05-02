import { useState } from "react";
import Button from "../common/Button";
import ImageIcon from "../icon/ImageIcon";
import CodeEditIcon from "../icon/CodeEditIcon";

export default function WriteCommentItem({
  channelId,
  postId,
}: {
  channelId: string;
  postId: string;
}) {
  const [comment, setComment] = useState("");
  const changeCommentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append(
    //   "request",
    //   new Blob(
    //     [
    //       JSON.stringify({
    //         postId: postId,
    //         comment: comment,
    //       }),
    //     ],
    //     { type: "application/json" }
    //   )
    // );
    formData.append("postId", postId);
    formData.append("comment", comment);

    // axios
  };

  return (
    <>
      <div className="max-w-[999px] h-auto rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <form onSubmit={(e) => submitHandler(e)}>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => changeCommentHandler(e)}
            placeholder="댓글을 작성해 주세요"
            className="w-full h-[57px] text-xl p-[22px] resize-none outline-none"
          />
          <div className="w-full h-[50px] flex justify-end items-center">
            <div className="pr-[33px]">
              {channelId === "1" && <CodeEditIcon />}
              <ImageIcon />
            </div>
            <div className="pr-[10px]">
              <Button value="댓글 달기" className="button-style3" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
