import axiosClient from '@/apis/axios-client';

const cancelOrder = async orderId => {
    return await axiosClient.put(`/payos/${orderId}`);
};

export { cancelOrder };
