import { useContext, useState } from 'react';
import styles from '../styles.module.scss';
import { SidebarContext } from '@contexts/SideBarProvider';
import { StoreContext } from '@contexts/StoreProvider';
import Cookies from 'js-cookie';

function Menu({ content, href }) {
    const { setIsOpen, setType } = useContext(SidebarContext);
    const { userInfo, handleLogout } = useContext(StoreContext);
    const [isShowSubMenu, setIsShowSubMenu] = useState(false);
    const handleClickShowLogin = () => {
        if (content === 'Sign in' && !userInfo) {
            setIsOpen(true);
            setType('login');
        }
    };
    const handleRenderText = content => {
        return content === 'Sign in' && userInfo
            ? `Hello: ${userInfo?.username}`
            : content;
    };
    const handleHover = () => {
        if (content === 'Sign in' && userInfo) {
            setIsShowSubMenu(true);
        }
    };

    return (
        <div
            className={styles.menu}
            onClick={handleClickShowLogin}
            onMouseEnter={handleHover}
        >
            {handleRenderText(content)}
            {isShowSubMenu && (
                <div
                    onClick={handleLogout}
                    onMouseLeave={() => setIsShowSubMenu(false)}
                    className={styles.subMenu}
                >
                    Log out
                </div>
            )}
        </div>
    );
}

export default Menu;
