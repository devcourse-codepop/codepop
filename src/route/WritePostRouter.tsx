import { useParams } from "react-router-dom";
import CreateCodePost from "../pages/write/CreateCodePost";
import CreateSetPost from "../pages/write//CreateSetPost";
import CreateVotePost from "../pages/write/CreateVotePost";

const ChannelWriteRouter: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();

  switch (channelId) {
    case "681b84d4437f722b6908ab61":
      return <CreateCodePost />;
    case "681b850d437f722b6908ab65":
      return <CreateSetPost />;
    case "681b8570437f722b6908ab69":
      return <CreateVotePost />;
    default:
      return <div>해당 채널이 존재하지 않습니다.</div>; // 나중에 404 페이지로 변환
  }
};

export default ChannelWriteRouter;
