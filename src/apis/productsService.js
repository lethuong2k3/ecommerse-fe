import axios from 'axios';

const getProducts = async query => {
    const { sortType, page, limit } = query;
    const queryLimmit = limit === 'all' ? '' : `limit=${limit}`;
    try {
        const respone = await axios.get(
            `http://localhost:8080/products?sortType=${sortType}&page=${page}&${queryLimmit}`
        );
        return respone.data;
    } catch (error) {
        console.error(error);
    }
};

export default getProducts;
