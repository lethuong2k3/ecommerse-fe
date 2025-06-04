import Button from '@components/Button/Button';
import InputGroup from '@pages/DetailProduct/components/InputGroup';
import styles from '../styles.module.scss';

function ReviewProduct() {
    return (
        <div className={styles.containerReview}>
            <div className={styles.reviews}>ĐÁNH GIÁ</div>
            <p className={styles.noReview}>Không có đánh giá.</p>
            <div className={styles.replyForm}>
                <div className={styles.commentReplyTitle}>
                    ĐÁNH GIÁ CỦA BẠN VỀ SẢN PHẨM "10K YELL"
                </div>
                <form>
                    <InputGroup
                        label={'Đánh giá sao'}
                        isRequired
                        typeChildren={'rating'}
                    />
                    <InputGroup
                        label={'Nội dung đánh giá'}
                        isRequired
                        typeChildren={'textarea'}
                    />
                    <div className={styles.btnSubmit}>
                        <Button content={'SUBMIT'} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReviewProduct;
