import { useCallback, useRef, useState } from "react";
import ChannelName from "../../components/channel/ChannelName";
import Button from "../../components/common/Button";
import Editor from "../../components/editor/Editor";
import { createCodePost } from "../../api/write/write";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateSetPost() {
  const titleRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState(""); // Editor에서 본문 HTML을 받음
  const [pollOptions, setPollOptions] = useState<
    { id: number; text: string }[]
  >([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { channelId } = useParams();

  const handlePollCreate = useCallback(
    (options: { id: number; text: string }[]) => {
      setPollOptions(options);
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/channel/${channelId}`);
    const titleText = titleRef.current?.value || "";

    if (!channelId) {
      console.error("채널 ID가 없습니다.");
      return;
    }

    const formData = new FormData();

    formData.append(
      "title",
      JSON.stringify({
        title: titleText,
        content: content,
        pollOptions: pollOptions,
      })
    );
    formData.append("channelId", "681b850d437f722b6908ab65");

    if (imageFile) {
      formData.append("image", imageFile); // 이미지 파일 추가
    }

    try {
      const res = await createCodePost(formData);
      console.log("작성 성공:", res.data);
      // 성공 시 이동 등 처리
    } catch (err) {
      console.error("작성 실패", err);
    }
  };

  return (
    <>
      <div className="w-full flex relative">
        <div>
          <div className="pb-[30px]">
            <ChannelName channelId={channelId ?? "2"} />
          </div>

          <div className=" bg-white shadow-md rounded-[10px] p-5 relative  max-h-[697px] overflow-y-auto">
            <input
              type="text"
              ref={titleRef}
              placeholder="제목을 입력하세요"
              autoFocus
              className="w-[955px] font-semibold text-[25px] m-3 outline-none"
            />
            <hr className="mt-[15px] mb-[15px] opacity-30" />
            <Editor
              onChange={setContent}
              onPollCreate={handlePollCreate}
              onImageSelect={(file) => setImageFile(file)} // 이미지 저장
              initialContent={content}
            />
            <hr className="mb-[60px] opacity-30" />
            <Button
              value="완료"
              className="button-style2 absolute bottom-[15px] right-[20px]"
              onClick={handleSubmit} // 게시물 작성 완료 시 제출
            />
          </div>
        </div>
      </div>
    </>
  );
}
