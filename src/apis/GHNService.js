import axios from 'axios';

const axiosGHNAddress = axios.create({
    baseURL: 'https://online-gateway.ghn.vn/shiip/public-api/master-data',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        token: import.meta.env.VITE_TOKEN_GHN,
    },
});

const axiosGHNFee = axios.create({
    baseURL: 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        token: import.meta.env.VITE_TOKEN_GHN,
        shop_id: import.meta.env.VITE_SHOPID_GHN,
    },
});

const getProvince = async () => {
    return await axiosGHNAddress.get('/province');
};

const getDistrict = async provinceID => {
    return await axiosGHNAddress.get('/district', {
        params: {
            province_id: provinceID,
        },
    });
};

const getWard = async districtID => {
    return await axiosGHNAddress.get('/ward', {
        params: {
            district_id: districtID,
        },
    });
};

const getFee = async body => {
    return await axiosGHNFee.post('/fee', body);
};

export { getProvince, getDistrict, getWard, getFee };
