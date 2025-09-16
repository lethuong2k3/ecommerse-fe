import Button from '@components/Button/Button';
import InputGroup from '@pages/DetailProduct/components/InputGroup';
import styles from '../styles.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { createReview } from '@apis/reviewService';
import LoadMore from '@components/Loading/LoadMore';

function ReviewProduct({
    toast,
    userId,
    setIsOpen,
    setType,
    data,
    apiGetReviews,
    apiGetReview,
    reviews,
    userImg,
    isLoadingReviews,
    isReview,
}) {
    const [selectedStar, setSelectedStart] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const handleChooseStar = index => {
        setSelectedStart(index + 1);
    };
    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validationSchema: Yup.object({
            comment: Yup.string().max(
                200,
                'Nội dung đánh giá không được vượt quá 200 ký tự'
            ),
        }),
        onSubmit: async values => {
            if (isLoading) return;
            if (!userId) {
                setIsOpen(true);
                setType('login');
                toast.warning('Vui lòng đăng nhập');
                return;
            }
            if (selectedStar === 0) {
                toast.warning('Vui lòng chọn đánh giá sao');
                return;
            }
            setIsLoading(true);
            createReview({
                product: data,
                rating: selectedStar,
                comment: values.comment,
            })
                .then(res => {
                    apiGetReviews();
                    apiGetReview();
                    toast.success('Gửi đánh giá thành công');
                    setIsLoading(false);
                    formik.resetForm();
                    setSelectedStart(0);
                })
                .catch(err => {
                    setIsLoading(false);
                    console.log(err);
                });
        },
    });
    return (
        <div className={styles.containerReview}>
            {isLoadingReviews && <LoadMore />}
            {reviews.length === 0 ? (
                <p>Không có đánh giá.</p>
            ) : (
                <ul className={styles.reviewList}>
                    {reviews.map((review, idx) => (
                        <li key={idx}>
                            <div className={styles.boxContent}>
                                <img src={userImg} />
                                <div>
                                    <p>{review.userName}</p>
                                    <div className={styles.stars}>
                                        {'★'.repeat(review.rating)}
                                        {'☆'.repeat(5 - review.rating)}
                                    </div>
                                    <p>{review.comment}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {!isReview && (
                <div className={styles.replyForm}>
                    <div className={styles.commentReplyTitle}>
                        ĐÁNH GIÁ CỦA BẠN VỀ SẢN PHẨM "10K YELL"
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <InputGroup
                            label={'Đánh giá sao'}
                            isRequired
                            typeChildren={'rating'}
                            handleChooseStar={handleChooseStar}
                            selectedStar={selectedStar}
                        />
                        <InputGroup
                            label={'Nội dung đánh giá'}
                            isRequired
                            typeChildren={'textarea'}
                            formik={formik}
                        />
                        <div className={styles.btnSubmit}>
                            <Button content={'Gửi'} type='sumbit' />
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ReviewProduct;
