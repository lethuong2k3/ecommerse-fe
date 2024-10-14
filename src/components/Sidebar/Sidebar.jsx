import { useContext } from 'react';
import styles from './styles.module.scss';
import { SidebarContext } from '@contexts/SideBarProvider';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Login from '@components/ContentSideBar/Login';

function Sidebar() {
    const { isOpen, setIsOpen } = useContext(SidebarContext);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className={styles.container}>
            <div
                className={classNames({
                    [styles.overlay]: isOpen,
                })}
                onClick={handleToggle}
            />
            <div
                className={classNames(styles.sideBar, {
                    [styles.sideSideBar]: isOpen,
                })}
            >
                {isOpen && (
                    <div className={styles.boxIcon} onClick={handleToggle}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                )}
                <Login />
            </div>
        </div>
    );
}

export default Sidebar;
