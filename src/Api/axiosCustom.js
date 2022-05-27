import axios from "axios";
import { toast } from "react-toastify";

const axiosCustom = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors
// Add a request interceptor
axiosCustom.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ?? "";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosCustom.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error?.response?.status === 401) {
        localStorage.setItem('token','');
        console.log(window.location);
        window.location.replace('/?error='+error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axiosCustom;
