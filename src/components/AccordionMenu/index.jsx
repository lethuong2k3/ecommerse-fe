import { useState } from 'react';
import styles from './styles.module.scss';
import cls from 'classnames';
import { RiArrowDownWideLine } from 'react-icons/ri';
import { TfiLayoutLineSolid } from 'react-icons/tfi';

function AccordionMenu({ titleMenu, contentJsx, onClick, isSelected }) {
    const handleToggle = () => {
        onClick();
    };
    return (
        <div className={styles.container}>
            <div
                className={cls(styles.title, {
                    [styles.activeTitle]: isSelected,
                })}
                onClick={handleToggle}
            >
                {isSelected ? <RiArrowDownWideLine /> : <TfiLayoutLineSolid />}{' '}
                {titleMenu}
            </div>
            <div
                className={cls(styles.contentMenu, styles.borderBottom, {
                    [styles.isVisibility]: isSelected,
                })}
            >
                {contentJsx}
            </div>
        </div>
    );
}

export default AccordionMenu;
