import axiosClient from '@/apis/axios-client';

const createContact = async body => {
    return await axiosClient.post('/create-contact', body);
};

export { createContact };
