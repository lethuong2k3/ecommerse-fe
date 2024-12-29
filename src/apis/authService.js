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
