import axiosClient from './axiosClient';

const register = async body => {
    return await axiosClient.post('/register', body);
};

const signIn = async body => {
    return await axiosClient.post('/login', body);
};

const getInfo = async () => {
    return await axiosClient.get('/user/info/');
};

export { register, signIn, getInfo };
