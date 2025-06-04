import styles from './styles.module.scss';

function AdvanceHeadling() {
    return (
        <div className={styles.container}>
            <div className={styles.headline}></div>
            <div className={styles.containerMiddleBox}>
                <p className={styles.description}>
                    đừng bỏ lỡ ưu đãi siêu khủng
                </p>
                <p className={styles.title}>Sản Phẩm Tốt Nhất</p>
            </div>
            <div className={styles.headline}></div>
        </div>
    );
}

export default AdvanceHeadling;
