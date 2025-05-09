import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import { axiosInstance } from './api/axios';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Header from './components/header/Header';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';

export default function App() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);
  //const resetUser = useAuthStore((state) => state.resetUser); // 추기

  useEffect(() => {
    if (accessToken) {
      axiosInstance
        .get('/auth-user')
        .then((res) => {
          //resetUser(); // 추가
          setUser(res.data);
          useAuthStore.setState({ isLoading: false });
        })
        .catch(() => {
          useAuthStore.getState().logout();
          useAuthStore.setState({ isLoading: false });
        });
    } else {
      useAuthStore.setState({ isLoading: false });
    }
  });
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="mypage" element="" />
        <Route path="mypage/edit" element="" />

        <Route path="/user/:userId" element="" />

        <Route path="channel/:channelId" element={<PostList />} />
        <Route
          path="channel/:channelId/post/:postId"
          element={<PostDetail />}
        />
        <Route path="channel/:channelId/write" element="" />
        <Route path="channel/:channelId/update/:postId" element="" />

        <Route path="*" element="" />
      </Routes>
    </>
  );
}
