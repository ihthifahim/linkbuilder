import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://gum.lk/api/' : 'http://localhost:5050/api/';


const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const userTimezone = localStorage.getItem('locale') || 'UTC';
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    config.headers['usertimezone'] = userTimezone;

    return config;
});

export default axiosInstance;