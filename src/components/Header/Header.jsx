import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BoxIcon from './BoxIcon/BoxIcon';
import { dataBoxIcon, dataMenu } from './constants';
import Menu from './Menu/Menu';
import styles from './styles.module.scss';
import Logo from '@images/Logo.png';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import cartIcon from '@icons/cartIcon.svg';
import reload from '@icons/reload.svg';
import useScrollHandling from '@hooks/useScrollHandling';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { SidebarContext } from '@contexts/SideBarProvider';

function Header() {
    const { scrollPosition } = useScrollHandling();
    const [fixedPosition, setFixedPosition] = useState(false);
    const { isOpen, setIsOpen } = useContext(SidebarContext);
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
                                    setIsOpen={setIsOpen}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.containerBox}>
                        <img
                            src={reload}
                            style={{ width: '25px', height: '25px' }}
                            alt='reload'
                        />
                        <FontAwesomeIcon
                            style={{ width: '25px', height: '25px' }}
                            icon={faHeart}
                        />
                        <img
                            src={cartIcon}
                            style={{ width: '25px', height: '25px' }}
                            alt='cartIcon'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
