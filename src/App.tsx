import Avatar from './components/avatar/Avatar';
import PostBtn from './components/btn/PostBtn';
import VoteBtn from './components/btn/VoteBtn';
import ChannelName from './components/channel/ChannelName';
import ChannelBox from './components/sidebar/ChannelBox';
import Button from './components/common/Button';
import Input from './components/common/Input';
import DropSort from './components/post/DropSort';
import Header from './components/header/Header';
import BoldIcon from './components/icon/BoldIcon';
import CodeEditIcon from './components/icon/CodeEditIcon';
import ImageIcon from './components/icon/ImageIcon';
import MembeerBox from './components/sidebar/MemberBox';
import Notification from './components/notification/Notification';
import LikeComment from './components/reaction/LikeComment';
import SearchPost from './components/post/SearchPost';

export default function App() {
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
    </>
  );
}
