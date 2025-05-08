import ChannelName from '../components/channel/ChannelName';
// import Header from '../components/header/Header';
import PostDetailItem from '../components/post/PostDetailItem';
import WriteCommentItem from '../components/post/WriteCommentItem';
import ChannelBox from '../components/sidebar/ChannelBox';
import MemberBox from '../components/sidebar/MemberBox';

export default function PostDetail({
  channelId,
  postId,
}: {
  channelId: string;
  postId: string;
}) {
  const json = {
    title: '이건 뭘까요,,?',
    content:
      '어디부터가 오류일까요..? 도와주십쇼 !!!!!! 왜 실행되는지 모르겠습니다 ㅠㅠ',
  };

  return (
    <>
      {/* <div className="">
        <Header />
      </div> */}
      <div className="flex mx-[60px] h-[calc(100vh-100px)]">
        <div className="flex flex-col gap-[50px] pb-[60px]">
          <ChannelBox channelId={channelId} />
          <MemberBox />
          {/* <div className="">
            <MemberBox />
          </div> */}
        </div>
        <div className="w-full ml-[50px]">
          <div className="flex justify-between items-end pb-5">
            <ChannelName
              subtitle='"이거 왜 되지?"'
              title="미스터리 코드 공유 채널"
              channelId="1"
            />
          </div>
          {/* max-h-[640px] */}
          <div className="flex flex-col gap-[50px] max-h-[605px] overflow-auto">
            <PostDetailItem title={json} updatedAt="2025.04.29" />
            <WriteCommentItem channelId={channelId} postId={postId} />
          </div>
        </div>
      </div>
    </>
  );
}
