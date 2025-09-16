import LoadMore from '@/components/Loading/load-more';
import styles from '../styles.module.scss';

function LoadingCart() {
    return (
        <div className={styles.loadingCart}>
            <LoadMore />
        </div>
    );
}

export default LoadingCart;
