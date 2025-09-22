import CountDownTimer from '@components/CountDownTimer/CountDownTimer';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';

function Banner() {
    const targetDate = '2025-11-01T00:00:00';
      const navigate = useNavigate();
        const handleNavDetail = () => {
            navigate('/san-pham-chi-tiet/1')
        }
    return (
        <>
            <div className={styles.containerBanner}>
                <div className={styles.contentBox}>
                    <div className={styles.countDownBox}>
                        <CountDownTimer targetDate={targetDate} />
                    </div>
                    <div className={styles.title}>Sản Phẩm Đặc Biệt</div>
                    <div className={styles.boxBtn}>
                        <Button content='Mua ngay' onClick={() => handleNavDetail()} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
