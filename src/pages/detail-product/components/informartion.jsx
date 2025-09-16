import styles from '../styles.module.scss';

function InformationProduct() {
    const dataInfo = [
        { id: 1, title: 'Size', content: 'S, M, L' },
        { id: 2, title: 'Chất liệu', content: 'Fleece' },
        { id: 3, title: 'Màu sắc', content: 'Black, Blue' },
    ];
    return (
        <div className={styles.containerInfo}>
            {dataInfo.map((item, index) => {
                return (
                    <div key={index} className={styles.itemInfo}>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.content}>{item.content}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default InformationProduct;
