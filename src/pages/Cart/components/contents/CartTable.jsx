import React, { useState } from 'react';
import styles from '../../styles.module.scss';
import { FaRegTrashCan } from 'react-icons/fa6';
import LoadingCart from '@pages/Cart/components/Loading';
import QuantitySelector from '@components/QuantitySelector/QuantitySelector';

const CartTable = ({ listProductCart, getData, isLoading, getDataDelete }) => {
    const increment = (orderItemId, quantity, item) => {
        if (quantity < item.productDetail.amount) {
            getData(orderItemId, { quantity: +quantity + 1 });
        }
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
                                    onClick={() => deleteItem(item.id, item)}
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
                                <QuantitySelector
                                    decrement={decrement}
                                    increment={increment}
                                    item={item}
                                />
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
