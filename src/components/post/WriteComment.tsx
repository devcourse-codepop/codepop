import { useState } from "react";

export default function WriteComment({ postId }: { postId: string }) {
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
      <div className="w-[999px] h-[133px] rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="h-[26px]">icon section</div>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => changeCommentHandler(e)}
            placeholder="댓글을 작성해 주세요"
            className="w-full h-[77px] text-xl p-[22px] resize-none outline-none"
          />
          <div className="h-[30px]">button section</div>
        </form>
      </div>
    </>
  );
}
