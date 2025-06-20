// src/api/user.js
import axios from "../axiosConfig";

export const fetchUser = async () => {
  const res = await axios.get("/api/user");
  return res.data;
};
