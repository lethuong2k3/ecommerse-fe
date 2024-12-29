import axiosUser from '@apis/axiosUser';

const addProductToCart = async query => {
    return await axiosUser.post('/user/cart', query);
};

const getCart = async () => {
    return await axiosUser.get('/user/cart');
};

const deleteItem = async orderItemId => {
    return await axiosUser.delete(`/user/cart/${orderItemId}`);
};

const updateItem = async (orderItemId, data) => {
    return await axiosUser.put(`/user/cart/${orderItemId}`, data);
};

const deleteCart = async () => {
    return await axiosUser.delete('/user/cart/delete');
};

export { addProductToCart, getCart, deleteItem, updateItem, deleteCart };
