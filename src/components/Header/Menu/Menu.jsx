import { useContext } from 'react';
import style from '../styles.module.scss';
import { SidebarContext } from '@contexts/SideBarProvider';

function Menu({ content, href }) {
    const { setIsOpen, setType } = useContext(SidebarContext);
    const handleClickShowLogin = () => {
        if (content === 'Sign in') {
            setIsOpen(true);
            setType('login');
        }
    };
    return (
        <div className={style.menu} onClick={handleClickShowLogin}>
            {content}
        </div>
    );
}

export default Menu;
