import axiosClient from './axiosClient';

const getProducts = async query => {
    const { sortType, page, limit } = query;
    const queryLimmit = limit === 'all' ? '' : `limit=${limit}`;
    try {
        const respone = await axiosClient.get(
            `/product?sortType=${sortType}&page=${page}&${queryLimmit}`
        );
        return respone.data;
    } catch (error) {
        console.error(error);
    }
};

export default getProducts;
