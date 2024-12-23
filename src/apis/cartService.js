import axiosClient from '@apis/axiosClient';

const addProductToCart = async query => {
    return await axiosClient.post('/user/cart', query);
};

const getCart = async () => {
    return await axiosClient.get('/user/cart');
};

const deleteItem = async orderItemId => {
    return await axiosClient.delete(`/user/cart/${orderItemId}`);
};

const updateItem = async (orderItemId, data) => {
    return await axiosClient.put(`/user/cart/${orderItemId}`, data);
};

const deleteCart = async () => {
    return await axiosClient.delete('/user/cart/delete');
};

export { addProductToCart, getCart, deleteItem, updateItem, deleteCart };
