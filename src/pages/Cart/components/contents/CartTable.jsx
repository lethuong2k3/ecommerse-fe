import React, { useState } from 'react';
import styles from '../../styles.module.scss';
import { FaRegTrashCan } from 'react-icons/fa6';
import { updateItem } from '@apis/cartService';
import LoadingCart from '@pages/Cart/components/Loading';

const CartTable = ({ listProductCart, getData, isLoading, getDataDelete }) => {
    const increment = (orderItemId, quantity) => {
        getData(orderItemId, { quantity: +quantity + 1 });
    };
    const decrement = (orderItemId, quantity) => {
        if (quantity <= 1) {
            return;
        }
        getData(orderItemId, { quantity: +quantity - 1 });
    };
    const deleteItem = orderItemId => {
        getDataDelete(orderItemId);
    };
    return (
        <div className={styles.cartTable}>
            <table>
                <thead>
                    <tr>
                        <th>PRODUCT</th>
                        <th />
                        <th>PRICE</th>
                        <th>SKU</th>
                        <th>QUANTITY</th>
                        <th>SUBTOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {listProductCart.map(item => (
                        <tr key={item.id}>
                            <td className={styles.product}>
                                <img
                                    src={
                                        item.productDetail.product.images[0].url
                                    }
                                    alt={
                                        item.productDetail.product.images[0]
                                            .filename
                                    }
                                />
                                <div>
                                    <p>{item.productDetail.product.name}</p>
                                    <p>
                                        {item.productDetail.color.name},{' '}
                                        {item.productDetail.size.name}
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div
                                    onClick={() => deleteItem(item.id)}
                                    style={{
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <FaRegTrashCan />
                                </div>
                            </td>
                            <td>${item.itemPrice}</td>
                            <td>{item.productDetail.product.sku}</td>
                            <td>
                                <div className={styles.quantitySelector}>
                                    <button
                                        className={styles.decrement}
                                        onClick={() =>
                                            decrement(item.id, item.quantity)
                                        }
                                    >
                                        -
                                    </button>
                                    <span className={styles.quantity}>
                                        {item.quantity}
                                    </span>
                                    <button
                                        className={styles.increment}
                                        onClick={() =>
                                            increment(item.id, item.quantity)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>${item.totalPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isLoading && <LoadingCart />}
        </div>
    );
};

export default CartTable;
