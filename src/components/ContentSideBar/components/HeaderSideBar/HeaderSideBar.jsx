import styles from './styles.module.scss';

function HeaderSideBar({ icon, title }) {
    return (
        <div className={styles.container}>
            {icon}
            <div className={styles.title}>{title}</div>
        </div>
    );
}

export default HeaderSideBar;
