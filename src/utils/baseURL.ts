import axios from "axios";

// Tạo instance axios với baseURL cố định
const api = axios.create({
  baseURL: "https://iot-project-hcmut.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Tự động thêm token vào header nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
