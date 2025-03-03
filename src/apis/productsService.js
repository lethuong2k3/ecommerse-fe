import axiosClient from '@apis/axiosClient';

const getProducts = async query => {
    const { sortType, page, limit, categoryName } = query;
    const queryLimmit = limit === 0 ? '' : `limit=${limit}`;
    const queryCategoryName =
        categoryName === 'all' ? '' : `categoryName=${categoryName}`;
    try {
        const respone = await axiosClient.get(
            `/products?sortType=${sortType}&page=${page}&${queryLimmit}&${queryCategoryName}`
        );
        return respone.data;
    } catch (error) {
        console.error(error);
    }
};

const getProduct = async id => {
    return axiosClient.get(`/product/${id}`);
};

const getRelatedProducts = async body => {
    return await axiosClient.post('/product/related', body);
};

const getProductDetail = async id => {
    return await axiosClient.get(`/product-detail/${id}`);
};

export { getProducts, getProductDetail, getProduct, getRelatedProducts };
