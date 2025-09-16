import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_URL_BE,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default axiosClient;
