import axiosUser from '@apis/axiosUser';

const createWishList = async body => {
    return await axiosUser.post('/user/create-wishlist', body);
};

const deleteWishList = async id => {
    return await axiosUser.delete(`/user/delete-wishlist/${id}`);
};

const removeAllWishList = async body => {
    return await axiosUser.post(`/user/delete-all-wishlist`, body);
};

const getWishList = async () => {
    return await axiosUser.get('/user/wishlist');
};

const getWListByProductAndUser = async body => {
    return await axiosUser.post('/user/wishlist-product-user', body);
};

export {
    createWishList,
    getWishList,
    deleteWishList,
    removeAllWishList,
    getWListByProductAndUser,
};
