import styles from '../styles.module.scss';
import cls from 'classnames';

function Color({
    colors,
    colorChoose,
    handleChooseColor,
    isViewProduct = false,
    ...params
}) {
    return (
        <div
            className={
                isViewProduct ? styles.boxColorViewProduct : styles.boxColor
            }
            {...params}
        >
            {colors?.map((color, index) => (
                <div
                    key={index}
                    className={cls(styles.colors, {
                        [styles.isActiveColor]: colorChoose === color,
                    })}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleChooseColor(color)}
                ></div>
            ))}
        </div>
    );
}

export default Color;
