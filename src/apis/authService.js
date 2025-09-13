import axios from 'axios';
import axiosUser from './axiosUser';

const register = async body => {
    return await axiosUser.post('/register', body);
};

const signIn = async body => {
    return await axiosUser.post('/login', body);
};

const getInfo = async userId => {
    return await axiosUser.get(`/user/info/${userId}`);
};

const logOut = async () => {
    return await axiosUser.post('/user/logout');
};

const verify = async body => {
    return await axiosUser.post('/verify', body);
};

const resend = async email => {
    return await axiosUser.post('/resend', null, { params: { email } });
};

const refreshTokenApi = async refreshToken => {
    try {
        const resp = await axios.post(
            `${import.meta.env.VITE_URL_BE}/refresh-token`,
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

export { register, signIn, getInfo, logOut, refreshTokenApi, verify, resend };
