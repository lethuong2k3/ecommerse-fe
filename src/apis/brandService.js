import axiosClient from '@apis/axiosClient';

const getBrands = async () => {
    return await axiosClient.get('/brands');
};

export { getBrands };
