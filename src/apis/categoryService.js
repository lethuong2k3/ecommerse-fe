import axiosClient from '@apis/axiosClient';

const getCategories = async () => {
    return await axiosClient.get('/categories');
};

export { getCategories };
