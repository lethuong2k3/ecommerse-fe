import axiosClient from '@apis/axiosClient';

const cancelOrder = async orderId => {
    return await axiosClient.put(`/payos/${orderId}`);
};

export { cancelOrder };
