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
                    {sizes?.map((size, index) => (
                        <div
                            className={cls(styles.sizes, {
                                [styles.isActiveSize]: sizeChoose === size,
                            })}
                            style={{
                                padding: isViewProduct ? '9px 12px' : '4px 8px',
                            }}
                            key={index}
                            onClick={() => handleChooseSize(size)}
                        >
                            {size}
                        </div>
                    ))}
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
