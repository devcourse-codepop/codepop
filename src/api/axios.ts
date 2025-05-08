import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY4MWI4NjQwNDM3ZjcyMmI2OTA4YWI3MSIsImVtYWlsIjoieXViaW4xMjFAZ21haWwuY29tIn0sImlhdCI6MTc0NjYzNDQ0N30.WUUuUzDqcxT4a2XSILxX8jM8u8xch_s3hxjrQ2KGfJs',
  },
});
