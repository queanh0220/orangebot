import axios from "axios";

const axiosCustom = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors
// Add a request interceptor
axiosCustom.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ?? '';
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axiosCustom;