import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import { axiosInstance } from "./api/axios";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
// import CreateCodePost from "./pages/write/CreateCodePost";
import WritePostRouter from "./route/WritePostRouter";
export default function App() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (accessToken) {
      axiosInstance
        .get("/auth-user")
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          useAuthStore.getState().logout();
        });
    }
  });
  return (
    <>
      <Routes>
        {/* <Route path="/channel/:channelId/write" element={<CreateCodePost />} /> */}
        <Route path="/channel/:channelId/write" element={<WritePostRouter />} />
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />


        <Route path="/" element={<SignUp />} />
        <Route path="channel/:channelId" element={<SignUp />} />
        <Route path="channel/:channelId/post/:postId" element={<SignUp />} />
        
        <Route path="channel/:channelId/update/:postId" element={<SignUp />} />

        <Route path="*" element={<SignUp />} />
      </Routes> */}
    </>
  );
}
