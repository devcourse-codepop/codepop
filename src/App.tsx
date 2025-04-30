export default function App() {
  import Avatar from "./components/avatar/Avatar";
  import ChannelName from "./components/channel/ChannelName";
  import LikeComment from "./components/reaction/LikeComment";
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
    </>
  );
}
