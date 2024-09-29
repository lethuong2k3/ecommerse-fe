import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles.module.scss';

function InfoCard({ item }) {
    return (
        <div className={styles.containerCard}>
            <FontAwesomeIcon
                style={{ width: '40px', height: '40px', color: '#707070' }}
                icon={item.icon}
            />
            <div className={styles.containerContent}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.description}>{item.description}</div>
            </div>
        </div>
    );
}

export default InfoCard;
