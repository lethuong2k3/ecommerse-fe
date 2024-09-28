import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BoxIcon from './BoxIcon/BoxIcon';
import { dataBoxIcon, dataMenu } from './constants';
import Menu from './Menu/Menu';
import styles from './styles.module.scss';
import Logo from '@images/Logo-retina.png';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import cartIcon from '@icons/cartIcon.svg';
import reload from '@icons/reload.svg';

function Header() {
    return (
        <div className={styles.container}>
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
                        style={{ width: '153px', height: '53px' }}
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
