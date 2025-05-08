// api/write.ts
import { axiosInstance } from "../axios";

// write.ts
export const createCodePost = (formData: {
  title: string;
  image: null;
  channelId: string;
}) => {
  return axiosInstance.post("/posts/create", formData);
};
