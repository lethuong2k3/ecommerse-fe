import axiosClient from './axiosClient';

const getProducts = async () => {
    try {
        const respone = await axiosClient.get('/product');
        return respone.data;
    } catch (error) {
        console.error(error);
    }
};

export default getProducts;
