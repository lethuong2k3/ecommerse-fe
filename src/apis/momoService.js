import axiosUser from '@apis/axiosUser';

const momoIpn = async (orderId, requestId) => {
    return await axiosUser.get('/user/momo/ipn', {
        params: { orderId, requestId },
    });
};

export { momoIpn };
