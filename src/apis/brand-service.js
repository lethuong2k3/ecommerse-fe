import axiosClient from '@/apis/axios-client';

const getBrands = async () => {
    return await axiosClient.get('/brands');
};

export { getBrands };
