import axiosUser from '@apis/axiosUser';

const saveOrder = async body => {
    return await axiosUser.post('/user/save-order', body);
};

const getOrder = async orderCode => {
    return await axiosUser.get(`/user/order/${orderCode}`);
}

const orderTrackings = async body => {
    return await axiosUser.post('/user/order-tracking', body);
};

const orderHistories = async orderCode => {
    return await axiosUser.get(`/user/order-details/${orderCode}`);
};

export { saveOrder, orderTrackings, orderHistories, getOrder };
