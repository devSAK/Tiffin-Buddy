import axios from "axios";

axios.defaults.baseURL = "http://localhost:5111";
axios.defaults.headers.common["Content-Type"] = "application/json";

export default axios;
