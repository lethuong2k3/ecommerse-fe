import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

function PageHeader({ icon, title, ...params }) {
    return (
        <div className={styles.container} {...params}>
            {icon}
            <div className={styles.title}>{title}</div>
        </div>
    );
}

export default PageHeader;
