import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshTokenApi } from '@apis/authService';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
axiosClient.interceptors.request.use(
    async config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
axiosClient.interceptors.response.use(
    res => {
        return res;
    },
    async err => {
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = Cookies.get('refreshToken');
            if (!refreshToken) return Promise.reject(err);
            try {
                const res = await refreshTokenApi(refreshToken);
                const newAccessToken = res.token;
                const refreshNewToken = res.refreshToken;
                Cookies.set('token', newAccessToken);
                Cookies.set('refreshToken', refreshNewToken);
                axiosClient.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (err) {
                Cookies.remove('token');
                Cookies.remove('refreshToken');
                Cookies.remove('id');
                return Promise.reject(err);
            }
        }
    }
);
export default axiosClient;
