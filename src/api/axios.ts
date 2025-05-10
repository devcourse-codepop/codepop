import axios from "axios";
import { useAuthStore } from "../stores/authStore";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// export const axiosPostInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     accept: 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY4MWI4NjQwNDM3ZjcyMmI2OTA4YWI3MSIsImVtYWlsIjoieXViaW4xMjFAZ21haWwuY29tIn0sImlhdCI6MTc0NjYzNDQ0N30.WUUuUzDqcxT4a2XSILxX8jM8u8xch_s3hxjrQ2KGfJs',
//   },
// });

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // if (error.response?.status === 401) {
    //   useAuthStore.getState().logout();
    //   window.location.href = "/login";
    // }

    // if (error.response?.status === 404) {
    //   window.location.href = '/not-found';
    // }
    return Promise.reject(error);
  }
);
