import Avatar from "./components/avatar/Avatar";
import PostBtn from "./components/btn/PostBtn";
import VoteBtn from "./components/btn/VoteBtn";
import ChannelName from "./components/channel/ChannelName";
import ChannelBox from "./components/sidebar/ChannelBox";
import Button from "./components/common/Button";
import Input from "./components/common/Input";
import DropSort from "./components/post/DropSort";
import Header from "./components/header/Header";
import BoldIcon from "./components/icon/BoldIcon";
import CodeEditIcon from "./components/icon/CodeEditIcon";
import ImageIcon from "./components/icon/ImageIcon";
import MembeerBox from "./components/sidebar/MemberBox";
import Notification from "./components/notification/Notification";
import LikeComment from "./components/reaction/LikeComment";
import SearchPost from "./components/post/SearchPost";
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
      <Avatar
        name="사용자"
        email="user123@gmail.com"
        image="../src/assets/images/avatar.svg"
      />
      <ChannelName
        subtitle='"골라봐"'
        title="선택의 갈림길에서 함께 답을 찾는 채널"
      />
      <LikeComment likeCount={12} commentCount={10} />
      <PostBtn />
      <VoteBtn />
      <Button value="LogIn" className="button-style1" />
      <Input type="email" placeholder="Email" className="input-style1" />

      <Header />
      <BoldIcon />
      <CodeEditIcon />
      <ImageIcon />
      <Notification />
      <ChannelBox />
      <DropSort />
      <MembeerBox />
      <SearchPost />

      <WriteComment channelId="1" postId="1" />
      <hr className="my-[50px]" />
      <WritePost channelId="3" />
      <hr className="my-[50px]" />
      <PostList title={json} updatedAt="2025.04.29" />
    </>
  );
}
