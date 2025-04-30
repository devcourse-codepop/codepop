import PostList from "./components/post/PostList";
import WriteComment from "./components/post/WriteComment";
import WritePost from "./components/post/WritePost";

export default function App() {
  const json = {
    title: "이건 뭘까요,,?",
    content:
      "어디부터가 오류일까요..? 도와주십쇼 !!!!!! 왜 실행되는지 모르겠습니다 ㅠㅠ",
    tag: "JavaScript",
  };
  return (
    <>
      <WriteComment postId="1" />
      <hr className="my-[50px]" />
      <WritePost channelId="1" />
      <hr className="my-[50px]" />
      <PostList title={json} updatedAt="2025.04.29" />
    </>
  );
}
