import Button from '@components/Button/Button';
import styles from './styles.module.scss';

function Banner() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Fpoly Clothes</h1>
                <div className={styles.description}>
                    Tiếp nối thông điệp thời trang bền vững và xu hướng toàn cầu
                    về bảo vệ môi trường, các sản phẩm của Fpoly Clothes ưu tiên
                    sử dụng các chất liệu có nguồn gốc từ thiên nhiên.
                </div>
                <Button content={'Go to shop'}></Button>
            </div>
        </div>
    );
}

export default Banner;
