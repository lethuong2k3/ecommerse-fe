import styles from './styles.module.scss';

function Loading() {
    return (
        <div className={styles.boxLoader}>
            <div className={styles.loader}></div>
        </div>
    );
}

export default Loading;
