import style from '../styles.module.scss';

function Menu({ content, href }) {
    return <div className={style.menu}>{content}</div>;
}

export default Menu;
