import axiosClient from '@/apis/axios-client';

const getAllPaymentTypes = async () => {
    return await axiosClient.get('/payment-types');
};

export { getAllPaymentTypes };
