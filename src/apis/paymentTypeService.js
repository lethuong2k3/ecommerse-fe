import axiosClient from '@apis/axiosClient';

const getAllPaymentTypes = async () => {
    return await axiosClient.get('/payment-types');
};

export { getAllPaymentTypes };
