import axiosUser from '@apis/axiosUser';

const getListCompare = async () => {
    return await axiosUser.get('/user/list-compare');
};

const getCompareByProduct = async body => {
    return await axiosUser.post('/user/compare-product', body);
};

const createCompare = async body => {
    return await axiosUser.post('/user/create-compare', body);
};

const deleteCompare = async id => {
    return await axiosUser.delete(`/user/delete-compare/${id}`);
};

const deleteAllCompare = async body => {
    return await axiosUser.post('/user/delete-all-compare', body);
};

export {
    getListCompare,
    createCompare,
    deleteAllCompare,
    deleteCompare,
    getCompareByProduct,
};
