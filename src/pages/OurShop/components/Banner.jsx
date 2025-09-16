import CountDownTimer from '@components/CountDownTimer/CountDownTimer';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button';

function Banner() {
    const targetDate = '2025-07-28T00:00:00';
    return (
        <>
            <div className={styles.containerBanner}>
                <div className={styles.contentBox}>
                    <div className={styles.countDownBox}>
                        <CountDownTimer targetDate={targetDate} />
                    </div>
                    <div className={styles.title}>Sản Phẩm Đặc Biệt</div>
                    <div className={styles.boxBtn}>
                        <Button content='Mua ngay' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
