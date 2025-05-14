import { useParams } from 'react-router-dom';
import CreateCodePost from '../pages/write/CreateCodePost';
import CreateSetPost from '../pages/write//CreateSetPost';
import CreateVotePost from '../pages/write/CreateVotePost';
import { Theme } from '../types/ darkModeTypes';

const ChannelWriteRouter: React.FC<{ theme: Theme }> = ({ theme }) => {
  const { channelId } = useParams<{ channelId: string }>();

  switch (channelId) {
    case '1':
      return <CreateCodePost theme={theme} />;
    case '2':
      return <CreateSetPost theme={theme} />;
    case '3':
      return <CreateVotePost theme={theme} />;
    default:
      return <div>해당 채널이 존재하지 않습니다.</div>; // 나중에 404 페이지로 변환
  }
};

export default ChannelWriteRouter;
