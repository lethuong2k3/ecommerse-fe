import { useContext } from 'react';
import styles from './styles.module.scss';
import { SidebarContext } from '@contexts/SideBarProvider';
import classNames from 'classnames';

import Login from '@components/ContentSideBar/Login/Login';
import Compare from '@components/ContentSideBar/Compare/Compare';
import { MdClose } from "react-icons/md";


function Sidebar() {
    const { isOpen, setIsOpen, type } = useContext(SidebarContext);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handleRenderContent = () => {
        switch (type) {
            case 'login':
                return <Login />;
            case 'compare':
                return <Compare />;
            case 'wishlist':
                return 'wishlist';
            case 'cart':
                return 'cart';
        }
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
                        <MdClose />
                    </div>
                )}
                {handleRenderContent()}
            </div>
        </div>
    );
}

export default Sidebar;
