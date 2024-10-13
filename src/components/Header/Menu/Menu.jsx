import style from '../styles.module.scss';

function Menu({ content, href, setIsOpen }) {
    return (
        <div className={style.menu} onClick={() => setIsOpen(true)}>
            {content}
        </div>
    );
}

export default Menu;
