import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import { axiosInstance } from "./api/axios";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Error from "./pages/Error";
import MainLayout from "./layout/MainLayout";
import MainContent from "./pages/MainContent";

export default function App() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (accessToken) {
      axiosInstance
        .get("/auth-user")
        .then((res) => {
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
  }, []);

  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes> */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<MainContent />} />
          <Route path="/channel/1" element={<MainContent />} />
          <Route path="/channel/2" element={<MainContent />} />
          <Route path="/channel/3" element={<MainContent />} />
          <Route path="/mypage" element={<MainContent />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* <Routes>
        
        <Route path="/login" element={<Login />} />


        <Route path="/" element={< />} />
        <Route path="channel/:channelId" element={< />} />
        <Route path="channel/:channelId/post/:postId" element={< />} />
        <Route path="channel/:channelId/write" element={< />} />
        <Route path="channel/:channelId/update/:postId" element={< />} />

        <Route path="*" element={< />} />
      </Routes> */}
    </>
  );
}
