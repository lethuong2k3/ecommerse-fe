import CountDownTimer from '@/components/count-down-timer/count-down-timer';
import styles from './styles.module.scss';
import Button from '@/components/button/button';

function CountDownBanner() {
    const targerDate = '2025-07-28T00:00:00';
    return (
        <div className={styles.container}>
            <div className={styles.containerTimer}>
                <CountDownTimer targetDate={targerDate} />
            </div>
            <p className={styles.title}>Sản Phẩm Đặc Biệt</p>
            <Button content={'Mua ngay'} />
        </div>
    );
}

export default CountDownBanner;
