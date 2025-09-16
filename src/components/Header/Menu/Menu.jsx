import styles from '../styles.module.scss';

import { useContext, useState } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import { StoreContext } from '@contexts/StoreProvider';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '@contexts/SearchProvider';
import { accountMenu } from '@components/Header/constants';
import { FaRegUser } from 'react-icons/fa';

function Menu({ content, href }) {
    const { setIsOpen, setType } = useContext(SidebarContext);
    const { userInfo, handleLogout } = useContext(StoreContext);
    const { setShowSearch } = useContext(SearchContext);
    const [isShowSubMenu, setIsShowSubMenu] = useState(false);

    const navigate = useNavigate();
    const handleClickShowLogin = () => {
        if (content === 'Đăng nhập' && !userInfo) {
            setIsOpen(true);
            setType('login');
            return;
        }
        if (content === 'Tìm kiếm') {
            setShowSearch(true);
            return;
        }
        navigate(href);
    };
    const handleRenderText = content => {
        return content === 'Đăng nhập' && userInfo ? (
            <div className={styles.boxUser}>
                <FaRegUser /> {userInfo?.name}
            </div>
        ) : (
            content
        );
    };
    const handleHover = () => {
        if (content === 'Đăng nhập' && userInfo) {
            setIsShowSubMenu(true);
        }
    };

    const handleClickMenu = value => {
        if (value.content === 'Đăng xuất') {
            return handleLogout();
        }
        if (value.href) {
            navigate(value.href);
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
                    onMouseLeave={() => setIsShowSubMenu(false)}
                    className={styles.subMenu}
                >
                    {accountMenu.map((item, key) => {
                        return (
                            <div
                                className={styles.itemMenu}
                                key={key}
                                onClick={e => {
                                    e.stopPropagation();
                                    handleClickMenu(item);
                                }}
                            >
                                {item.content}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Menu;
