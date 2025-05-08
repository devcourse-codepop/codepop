import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element="" />

        <Route path="/login" element="" />
        <Route path="/signup" element="" />

        <Route path="mypage" element="" />
        <Route path="mypage/edit" element="" />

        <Route path="/user/:userId" element="" />

        <Route path="channel/:channelId" element={<PostList />} />
        <Route
          path="channel/:channelId/post/:postId"
          element={<PostDetail channelId="1" postId="1" />}
        />
        <Route path="channel/:channelId/write" element="" />
        <Route path="channel/:channelId/update/:postId" element="" />

        <Route path="*" element="" />
      </Routes>
    </>
  );
}
