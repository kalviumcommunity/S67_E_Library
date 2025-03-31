import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Attach the static token to every request
const STATIC_TOKEN = "your-static-secret-token";

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${STATIC_TOKEN}`;
  return config;
});

export default instance;
