import { useCallback, useRef, useState } from "react";
import ChannelName from "../../components/channel/ChannelName";
import Button from "../../components/common/Button";
import Editor from "../../components/editor/Editor";
import { createCodePost } from "../../api/write/write";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateCodePost() {
  const titleRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
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
    formData.append("channelId", "681b84d4437f722b6908ab61");

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

  const isSubmitDisabled = title.trim() === "" || content.trim() === "";
  // // 이미지 삭제 핸들러 추가
  // const handleImageDelete = () => {
  //   const newContent = content.replace(/<p[^>]*>\s*<img[^>]*>\s*<\/p>/g, "");
  //   setContent(newContent);
  //   setImageFile(null);
  //   console.log("에디터 본문에서 이미지 및 <p> 태그가 삭제되었습니다.");
  // };

  return (
    <div className='w-full flex relative'>
      <div>
        <div className='pb-[30px]'>
          <ChannelName channelId={channelId ?? "1"} />
        </div>

        <div className=' bg-white shadow-md rounded-[10px] p-5 relative max-h-[697px] overflow-y-auto'>
          <input
            type='text'
            value={title}
            ref={titleRef}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력하세요'
            autoFocus
            className='w-[955px] font-semibold text-[25px] m-3 outline-none'
          />
          <hr className='mt-[15px] mb-[15px] opacity-30' />
          <Editor
            onChange={setContent}
            onPollCreate={handlePollCreate}
            onImageSelect={(file) => setImageFile(file)} // 이미지 저장
            showCodeButton={true}
            initialContent={content}
          />
          <hr className='mb-[60px] opacity-30' />

          {/* {imageFile && (
            <Button
              value="이미지 삭제"
              className="button-style2 absolute bottom-[15px] right-[160px]"
              onClick={handleImageDelete}
            />
          )} */}

          <Button
            value='완료'
            className={`absolute bottom-[15px] right-[20px] button-style2 ${
              isSubmitDisabled ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              if (isSubmitDisabled) {
                e.preventDefault(); // 아무 동작도 하지 않음
                return;
              }
              handleSubmit(e);
            }}
          />
        </div>
      </div>
    </div>
  );
}
