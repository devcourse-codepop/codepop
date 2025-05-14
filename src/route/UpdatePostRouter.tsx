import { useParams } from 'react-router-dom';
import UpdateCodePost from '../pages/update/UpdateCodePost';
import UpdateSetPost from '../pages/update/UpdateSetPost';
import UpdateVotePost from '../pages/update/UpdateVotePost';
import { Theme } from '../types/ darkModeTypes';

const ChannelUpdateRouter: React.FC<{ theme: Theme }> = ({ theme }) => {
  const { channelId } = useParams<{ channelId: string }>();

  switch (channelId) {
    case '1':
      return <UpdateCodePost theme={theme} />;
    case '2':
      return <UpdateSetPost theme={theme} />;
    case '3':
      return <UpdateVotePost theme={theme} />;
    default:
      return <div>해당 채널이 존재하지 않습니다.</div>; // 나중에 404 페이지로 변환
  }
};

export default ChannelUpdateRouter;
