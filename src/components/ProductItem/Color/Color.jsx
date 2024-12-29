import styles from '../styles.module.scss';
import cls from 'classnames';

function Color({
    colors,
    colorChoose,
    handleChooseColor,
    isViewProduct = false,
}) {
    return (
        <div
            className={
                isViewProduct ? styles.boxColorViewProduct : styles.boxColor
            }
        >
            {colors?.map((color, index) => (
                <div
                    key={index}
                    className={cls(styles.colors, {
                        [styles.isActiveColor]: colorChoose === color,
                    })}
                    style={{ backgroundColor: color }}
                    onClick={() => handleChooseColor(color)}
                ></div>
            ))}
        </div>
    );
}

export default Color;
