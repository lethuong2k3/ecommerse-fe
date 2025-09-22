import CountDownTimer from '@components/CountDownTimer/CountDownTimer';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';

function CountDownBanner() {
    const targerDate = '2025-11-01T00:00:00';
    const navigate = useNavigate();
    const handleNavDetail = () => {
        navigate('/san-pham-chi-tiet/1')
    }
    return (
        <div className={styles.container}>
            <div className={styles.containerTimer}>
                <CountDownTimer targetDate={targerDate} />
            </div>
            <p className={styles.title}>Sản Phẩm Đặc Biệt</p>
            <Button content={'Mua ngay'} onClick={() => handleNavDetail()} />
        </div>
    );
}

export default CountDownBanner;
