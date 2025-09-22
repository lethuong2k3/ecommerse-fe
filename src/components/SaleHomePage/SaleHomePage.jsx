import Button from '@components/Button/Button';
import styles from './styles.module.scss';
import useTranslateXImage from '@hooks/useTranslateXImage';
import cls from 'classnames';

function SaleHomePage({handleNavToSale}) {
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
                    src='https://res.cloudinary.com/dtgijc0oh/image/upload/v1733017040/images/qma6x3belzbtsfbn8c5y.jpg'
                    alt=''
                />
            </div>
            <div className={styles.boxContent}>
                <h2 className={styles.title}>Nổi Bật</h2>
                <p className={styles.des}>
                    Mang đến trải nghiệm khác biệt với đường nét tối giản, chất liệu cao cấp và công năng tiện dụng.
                </p>
                <div className={styles.boxBtn}>
                    <Button isPrimary={false} content={'Chi tiết'} onClick={() => handleNavToSale()} />
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
                    src='https://res.cloudinary.com/dtgijc0oh/image/upload/v1733017021/images/mouk3t3bao3brrzgzw7k.jpg'
                    alt=''
                />
            </div>
        </div>
    );
}

export default SaleHomePage;
