import styles from '../styles.module.scss';

function InfoCard({ item }) {
    return (
        <div className={styles.containerCard}>
            <item.icon size='40px' color='#fff' />

            <div className={styles.containerContent}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.description}>{item.description}</div>
            </div>
        </div>
    );
}

export default InfoCard;
