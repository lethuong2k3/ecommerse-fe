import styles from './styles.module.scss';

function Loading({ ...props }) {
    return (
        <div className={styles.boxLoader} {...props}>
            <div className={styles.loader}></div>
        </div>
    );
}

export default Loading;
