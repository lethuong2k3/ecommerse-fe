import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

function QuantitySelector({
    decrement,
    increment,
    item,
    quantity,
    productDetail,
    productDetailCart,
    ...props
}) {
    const valueQuantity = item.quantity == undefined ? quantity : item.quantity;

    return (
        <div className={styles.quantitySelector} {...props}>
            <button
                className={styles.decrement}
                onClick={() => decrement(item.id, item.quantity)}
                style={{
                    cursor:
                        valueQuantity >=
                        +productDetail?.amount - +productDetailCart?.quantity
                            ? 'not-allowed'
                            : 'pointer',
                }}
            >
                -
            </button>
            <span className={styles.quantity}>{valueQuantity}</span>
            <button
                className={styles.increment}
                onClick={() => increment(item.id, item.quantity, item)}
                style={{
                    cursor:
                        valueQuantity >= item.productDetail?.amount ||
                        productDetail?.amount <= valueQuantity ||
                        valueQuantity >=
                            +productDetail?.amount -
                                +productDetailCart?.quantity
                            ? 'not-allowed'
                            : 'pointer',
                }}
            >
                +
            </button>
        </div>
    );
}

export default QuantitySelector;
