import LoadMore from '@components/Loading/LoadMore';
import styles from '../styles.module.scss';

function LoadingCart() {
    return (
        <div className={styles.loadingCart}>
            <LoadMore />
        </div>
    );
}

export default LoadingCart;
