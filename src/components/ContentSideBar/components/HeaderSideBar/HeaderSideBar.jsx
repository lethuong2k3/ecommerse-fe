import styles from './styles.module.scss';

function HeaderSideBar({ icon, title, handleNavigate }) {
    return (
        <div className={styles.container} onClick={() => handleNavigate()}>
            {icon}
            <div className={styles.title}>{title}</div>
        </div>
    );
}

export default HeaderSideBar;
