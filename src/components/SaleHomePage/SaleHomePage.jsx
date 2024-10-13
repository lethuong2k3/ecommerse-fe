import Button from '@components/Button/Button';
import styles from './styles.module.scss';
import useTranslateXImage from '@hooks/useTranslateXImage';

function SaleHomePage() {
    const { translateXPosition } = useTranslateXImage();

    return (
        <div className={styles.container}>
            <div
                className={styles.boxImage}
                style={{
                    transform: `translateX(${translateXPosition}px)`,
                    transition: 'transform 0.6s ease',
                }}
            >
                <img
                    src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image_1.jpeg'
                    alt=''
                />
            </div>
            <div className={styles.boxContent}>
                <h2 className={styles.title}>Sale of the year</h2>
                <p className={styles.des}>
                    Libero sed faucibus facilisis fermentum. Est nibh sed massa
                    sodales.
                </p>
                <div className={styles.boxBtn}>
                    <Button isPrimary={false} content={'Read more'} />
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
                    src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image_2.jpeg'
                    alt=''
                />
            </div>
        </div>
    );
}

export default SaleHomePage;
