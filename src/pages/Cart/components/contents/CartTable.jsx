import React, { useState } from 'react';
import styles from '../../styles.module.scss';
import { FaRegTrashCan } from 'react-icons/fa6';
import { formatPrice } from '@hooks/useFomatPrice';

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
                        <th>SẢN PHẨM</th>
                        <th />
                        <th>GIÁ</th>
                        <th>SKU</th>
                        <th>SỐ LƯỢNG</th>
                        <th>TẠM TÍNH</th>
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
                                <div className={styles.productDetail}>
                                    <p className={styles.productName}>
                                        {item.productDetail.product.name}
                                    </p>
                                    <p className={styles.attribute}>
                                        {item.productDetail.color.name},{' '}
                                        {item.productDetail.size.name}
                                    </p>
                                    <p className={styles.priceQty}>
                                        <span>
                                            <QuantitySelector
                                                decrement={decrement}
                                                increment={increment}
                                                item={item}
                                            />
                                        </span>
                                        X
                                        <span>
                                            {formatPrice(item.itemPrice)}
                                        </span>
                                    </p>
                                    <p className={styles.subtotal}>
                                        Tạm tính: {formatPrice(item.totalPrice)}
                                    </p>
                                    <p
                                        className={styles.remove}
                                        onClick={() =>
                                            deleteItem(item.id, item)
                                        }
                                    >
                                        Xóa
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
                            <td>{formatPrice(item.itemPrice)}</td>
                            <td>{item.productDetail.product.sku}</td>
                            <td className={styles.qty}>
                                <QuantitySelector
                                    decrement={decrement}
                                    increment={increment}
                                    item={item}
                                />
                            </td>
                            <td>{formatPrice(item.totalPrice)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isLoading && <LoadingCart />}
        </div>
    );
};

export default CartTable;
