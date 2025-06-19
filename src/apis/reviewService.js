import axiosClient from '@apis/axiosClient';
import axiosUser from '@apis/axiosUser';

const getReviews = async productId => {
    return axiosClient.get(`/reviews/${productId}`);
};

const getReview = async productId => {
    return axiosUser.get(`/user/review/${productId}`);
};

const createReview = async body => {
    return axiosUser.post('/review/create', body);
};

export { getReviews, createReview, getReview };
