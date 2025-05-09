import axios from "axios";

export const notificationAxiosInstance = axios.create({
  baseURL: "http://13.125.208.179:5008",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY4MWM4OTdlZDJlNThhNGIxZTJkNGE5YyIsImVtYWlsIjoibm90aXRlc3RAZ21haWwuY29tIn0sImlhdCI6MTc0NjcwMDc1MX0.HjlMti-6OJIPKZtRMkA379kSGkqzqsCyAYbaoqNWfBk",
  },
});
