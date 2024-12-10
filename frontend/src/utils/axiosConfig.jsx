import axios from 'axios';
import { API_URL } from './constants';

const baseURL = API_URL


const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})


export default axiosInstance;