import styles from '../styles.module.scss';
import cls from 'classnames';

function Color({
    colors,
    colorChoose,
    handleChooseColor,
    isViewProduct = false,
    disabledColors = [],
    ...params
}) {
    return (
        <div
            className={
                isViewProduct ? styles.boxColorViewProduct : styles.boxColor
            }
            {...params}
        >
            {colors?.map((color, index) => {
                const isDisabled = disabledColors.some(
                    dc => dc.hex === color.hex
                );

                return (
                    <div
                        key={index}
                        className={cls(styles.colors, {
                            [styles.isActiveColor]:
                                colorChoose?.hex === color.hex,
                            [styles.disabled]: isDisabled,
                        })}
                        style={{
                            backgroundColor: color.hex,
                            cursor: isDisabled ? 'not-allowed' : 'pointer',
                            opacity: isDisabled ? 0.5 : 1,
                        }}
                        onClick={() => !isDisabled && handleChooseColor(color)}
                    />
                );
            })}
        </div>
    );
}

export default Color;
