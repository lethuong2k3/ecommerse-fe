import styles from './styles.module.scss';

function AdvanceHeadling() {
    return (
        <div className={styles.container}>
            <div className={styles.headline}></div>
            <div className={styles.containerMiddleBox}>
                <p className={styles.description}>don't miss super offers</p>
                <p className={styles.title}>Our best products</p>
            </div>
            <div className={styles.headline}></div>
        </div>
    );
}

export default AdvanceHeadling;
