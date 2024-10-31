import CountDownTimer from '@components/CountDownTimer/CountDownTimer';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button';

function Banner() {
    const targetDate = '2024-12-31T00:00:00';
    return (
        <>
            <div className={styles.containerBanner}>
                <div className={styles.contentBox}>
                    <div className={styles.countDownBox}>
                        <CountDownTimer targetDate={targetDate} />
                    </div>
                    <div className={styles.title}>
                        The Classics Make A Comback
                    </div>
                    <div className={styles.boxBtn}>
                        <Button content='Buy now' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
