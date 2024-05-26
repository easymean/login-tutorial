import axios from "axios";

const baseURL = `http://localhost:3000/api`;
const instance = axios.create({
  baseURL,
  withCredentials: true,
});
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
