import { useParams } from "react-router-dom";
import UpdateCodePost from "../pages/update/UpdateCodePost";
import UpdateSetPost from "../pages/update/UpdateSetPost";
import UpdateVotePost from "../pages/update/UpdateVotePost";

const ChannelUpdateRouter: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();

  switch (channelId) {
    case "1":
      return <UpdateCodePost />;
    case "2":
      return <UpdateSetPost />;
    case "3":
      return <UpdateVotePost />;
    default:
      return <div>해당 채널이 존재하지 않습니다.</div>; // 나중에 404 페이지로 변환
  }
};

export default ChannelUpdateRouter;
