import styles from './styles.module.scss';
import cls from 'classnames';
import { RiArrowDownWideLine } from 'react-icons/ri';
import { TfiLayoutLineSolid } from 'react-icons/tfi';
import { HiOutlinePlus } from 'react-icons/hi2';

function AccordionMenu({
    titleMenu,
    contentJsx,
    onClick,
    isSelected,
    isAboutUs,
}) {
    const handleToggle = () => {
        onClick();
    };
    return (
        <div
            className={cls(styles.container, {
                [styles.aboutUs]: isAboutUs,
            })}
        >
            <div
                className={cls(styles.title, {
                    [styles.activeTitle]: isSelected,
                })}
                onClick={handleToggle}
            >
                {!isAboutUs &&
                    (isSelected ? (
                        <RiArrowDownWideLine />
                    ) : (
                        <TfiLayoutLineSolid />
                    ))}
                {titleMenu}
                {isAboutUs &&
                    (isSelected ? <TfiLayoutLineSolid /> : <HiOutlinePlus />)}
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
