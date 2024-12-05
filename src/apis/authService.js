import axios from 'axios';
import axiosClient from './axiosClient';
import Cookies from 'js-cookie';

const register = async body => {
    return await axiosClient.post('/register', body);
};

const signIn = async body => {
    return await axiosClient.post('/login', body);
};

const getInfo = async userId => {
    return await axiosClient.get(`/user/info/${userId}`);
};

const logOut = async () => {
    return await axiosClient.post('/user/logout');
};

const refreshTokenApi = async refreshToken => {
    try {
        const resp = await axios.post(
            'http://localhost:8080/refresh-token',
            {},
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            }
        );
        return resp.data;
    } catch (e) {
        console.log('Error', e);
    }
};

export { register, signIn, getInfo, logOut, refreshTokenApi };
