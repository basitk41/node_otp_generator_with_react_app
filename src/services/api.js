import axios from "axios";
const instance = axios.create();
instance.interceptors.request.use(
  async (config) => {
    config.baseURL = "http://localhost:3000/api/users";
    config.timeout = 1000;
    config.headers = {};
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default instance;
