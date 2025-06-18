import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/refresh-token",
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("jwt_token", res.data.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
        return instance(originalRequest);
      } catch (err) {
        localStorage.removeItem("jwt_token");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
