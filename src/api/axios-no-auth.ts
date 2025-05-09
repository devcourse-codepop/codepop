import axios from "axios";

export const noAuthAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
