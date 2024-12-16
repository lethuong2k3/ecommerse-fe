import BoxIcon from './BoxIcon/BoxIcon';
import { dataBoxIcon, dataMenu } from './constants';
import Menu from './Menu/Menu';
import styles from './styles.module.scss';
import Logo from '@images/Logo.png';

import useScrollHandling from '@hooks/useScrollHandling';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { SidebarContext } from '@contexts/SideBarProvider';
import { TfiReload } from 'react-icons/tfi';
import { BsHeart } from 'react-icons/bs';
import { BsCart3 } from 'react-icons/bs';

function Header() {
    const { scrollPosition } = useScrollHandling();
    const [fixedPosition, setFixedPosition] = useState(false);
    const { setIsOpen, setType, listProductCart } = useContext(SidebarContext);

    const handleOpenSideBar = type => {
        setIsOpen(true);
        setType(type);
    };
    useEffect(() => {
        setFixedPosition(scrollPosition > 80);
    }, [scrollPosition]);
    return (
        <div
            className={classNames(styles.container, styles.topHeader, {
                [styles.fixedHeader]: fixedPosition,
            })}
        >
            <div className={styles.containerHeader}>
                <div className={styles.containerBox}>
                    <div className={styles.containerBoxIcon}>
                        {dataBoxIcon.map((item, key) => {
                            return (
                                <BoxIcon
                                    key={key}
                                    type={item.type}
                                    href={item.href}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.containerBox}>
                        {dataMenu.slice(0, 3).map((item, key) => {
                            return (
                                <Menu
                                    key={key}
                                    content={item.content}
                                    href={item.href}
                                />
                            );
                        })}
                    </div>
                </div>
                <div>
                    <img
                        src={Logo}
                        style={{ width: '80px', height: '80px' }}
                        alt='Logo'
                    />
                </div>
                <div className={styles.containerBox}>
                    <div className={styles.containerMenu}>
                        {dataMenu.slice(3, dataMenu.length).map((item, key) => {
                            return (
                                <Menu
                                    key={key}
                                    content={item.content}
                                    href={item.href}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.containerBoxIcon}>
                        <TfiReload
                            size='22px'
                            onClick={() => handleOpenSideBar('compare')}
                        />
                        <BsHeart
                            size='22px'
                            onClick={() => handleOpenSideBar('wishlist')}
                        />
                        <div className={styles.boxCart}>
                            <BsCart3
                                size='22px'
                                onClick={() => handleOpenSideBar('cart')}
                            />
                            <div className={styles.quantity}>
                                {listProductCart.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
