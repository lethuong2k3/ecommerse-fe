import axiosClient from '@/apis/axios-client';

const getCategories = async () => {
    return await axiosClient.get('/categories');
};

export { getCategories };
