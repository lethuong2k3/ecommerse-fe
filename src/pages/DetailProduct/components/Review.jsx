import Button from '@components/Button/Button';
import InputGroup from '@pages/DetailProduct/components/InputGroup';
import styles from '../styles.module.scss';

function ReviewProduct() {
    return (
        <div className={styles.containerReview}>
            <div className={styles.reviews}>REVIEWS</div>
            <p className={styles.noReview}>There are no reviews yet.</p>
            <div className={styles.replyForm}>
                <div className={styles.commentReplyTitle}>
                    BE THE FIRST TO REVIEW "10K YELL"
                </div>
                <p className={styles.commentNotes}>
                    Your email address will not be published. Required fields
                    are marked
                </p>
                <form>
                    <InputGroup
                        label={'Your rating'}
                        isRequired
                        typeChildren={'rating'}
                    />
                    <InputGroup
                        label={'Your review'}
                        isRequired
                        typeChildren={'textarea'}
                    />
                    <InputGroup
                        label={'Name'}
                        isRequired
                        typeChildren={'input'}
                    />
                    <InputGroup
                        label={'Email'}
                        isRequired
                        typeChildren={'input'}
                    />
                    <div className={styles.commentFormCookiesConsent}>
                        <input style={{ marginTop: '4px' }} type='checkbox' />
                        <span>
                            Save my name, email, and website in this browser for
                            the next time I comment.
                        </span>
                    </div>
                    <div className={styles.btnSubmit}>
                        <Button content={'SUBMIT'} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReviewProduct;
