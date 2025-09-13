import { CiRuler } from 'react-icons/ci';
import styles from './styles.module.scss';
import cls from 'classnames';

function Size({
    showSizeChoose = false,
    isViewProduct,
    handleSetShowSizeChoose,
    handleChooseSize,
    sizes,
    sizeChoose,
    disabledSizes = [],
}) {
    return (
        <>
            {showSizeChoose || isViewProduct ? (
                <div
                    className={cls(
                        !isViewProduct
                            ? styles.boxSize
                            : styles.boxSizeViewProduct
                    )}
                >
                    {sizes?.map((size, index) => {
                        const isDisabled = disabledSizes.includes(size);
                        return (
                            <div
                                className={cls(styles.sizes, {
                                    [styles.isActiveSize]: sizeChoose === size,
                                    [styles.disabled]: isDisabled,
                                })}
                                style={{
                                    padding: isViewProduct
                                        ? '9px 12px'
                                        : '4px 8px',
                                    cursor: isDisabled
                                        ? 'not-allowed'
                                        : 'pointer',
                                    opacity: isDisabled ? 0.5 : 1,
                                }}
                                key={index}
                                onClick={() =>
                                    !isDisabled && handleChooseSize(size)
                                }
                            >
                                {size}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.boxAddSize}>
                    <div
                        className={styles.addSize}
                        onClick={handleSetShowSizeChoose}
                    >
                        <CiRuler size={25} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Size;
