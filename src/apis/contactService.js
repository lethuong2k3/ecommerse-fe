import axiosClient from '@apis/axiosClient';

const createContact = async body => {
    return await axiosClient.post('/create-contact', body);
};

export { createContact };
