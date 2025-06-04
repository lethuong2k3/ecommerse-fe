import Button from '@components/Button/Button';
import styles from './styles.module.scss';
import useTranslateXImage from '@hooks/useTranslateXImage';
import cls from 'classnames';

function SaleHomePage() {
    const { translateXPosition } = useTranslateXImage();

    return (
        <div className={styles.container}>
            <div
                className={cls(styles.boxImage, styles.responsive)}
                style={{
                    transform: `translateX(${translateXPosition}px)`,
                    transition: 'transform 0.6s ease',
                }}
            >
                <img
                    src='https://pos.nvncdn.com/fa2431-2286/album/albumItem/20250417_ZW1Qo5Q4.jpeg'
                    alt=''
                />
            </div>
            <div className={styles.boxContent}>
                <h2 className={styles.title}>Tái Sinh</h2>
                <p className={styles.des}>
                    Lấy cảm hứng từ vẻ đẹp bất tận và sự sinh sôi, nảy nở không
                    ngừng của thiên nhiên
                </p>
                <div className={styles.boxBtn}>
                    <Button isPrimary={false} content={'Chi tiết'} />
                </div>
            </div>
            <div
                className={styles.boxImage}
                style={{
                    transform: `translateX(-${translateXPosition}px)`,
                    transition: 'transform 0.6s ease',
                }}
            >
                <img
                    src='https://pos.nvncdn.com/fa2431-2286/album/albumItem/20250417_7P5BwMbR.jpeg'
                    alt=''
                />
            </div>
        </div>
    );
}

export default SaleHomePage;
