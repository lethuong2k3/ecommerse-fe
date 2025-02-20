import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import styles from './styles.module.scss';

function LoadMore({ ...params }) {
    return (
        <AiOutlineLoading3Quarters className={styles.loadMore} {...params} />
    );
}

export default LoadMore;
