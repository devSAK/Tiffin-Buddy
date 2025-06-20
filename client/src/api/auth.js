import axios from "../../axiosConfig";

const API = axios.create({
  baseURL: "http://localhost:5111/api", // replace with your production URL if deployed
  withCredentials: true, // if you are using cookies
});

export const login = (identifier, password) =>
  API.post("/auth/login", { identifier, password });

export const signup = (formData) => API.post("/auth/signup", formData);
