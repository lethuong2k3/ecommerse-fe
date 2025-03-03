import axiosUser from '@apis/axiosUser';

const getListCompare = async () => {
    return await axiosUser.get('/user/list-compare');
};

const createCompare = async body => {
    return await axiosUser.post('/user/create-compare', body);
};

const deleteCompare = async body => {
    return await axiosUser.post('/user/delete-compare', body);
};

const deleteAllCompare = async body => {
    return await axiosUser.post('/user/delete-all-compare', body);
};

export { getListCompare, createCompare, deleteAllCompare, deleteCompare };
