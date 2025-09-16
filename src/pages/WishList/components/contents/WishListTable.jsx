import Button from '@components/Button/Button';
import styles from '../../styles.module.scss';
import { BsEye, BsCart3 } from 'react-icons/bs';
import { FaRegTrashCan } from 'react-icons/fa6';
import moment from 'moment';
import CheckBox from '@components/CheckBox/CheckBox';

function WishListTable({
    wishlist,
    showDetail,
    navigateDetail,
    remove,
    handleSelect,
    handleSelectAll,
    handleNavigateToDetail,
    selected,
    getPriceRange,
}) {
    return (
        <div className={styles.wishlistTable}>
            <table>
                <thead>
                    <tr>
                        <th>
                            <CheckBox
                                name='all'
                                value={selected.length === wishlist.length}
                                updateValue={handleSelectAll}
                            />
                        </th>
                        <th className={styles.columnProduct}>SẢN PHẨM</th>
                        <th className={styles.columnPrice}>GIÁ</th>
                        <th className={styles.columnStatus}>TRẠNG THÁI</th>
                        <th className={styles.columnAction}></th>
                    </tr>
                </thead>
                <tbody>
                    {wishlist.map((item, index) => (
                        <tr key={index}>
                            <td className={styles.checkBox}>
                                <CheckBox
                                    name={item}
                                    value={selected.includes(item)}
                                    updateValue={handleSelect}
                                />
                            </td>
                            <td className={styles.productInfo}>
                                <img
                                    src={item.product.images[0].url}
                                    alt={item.product.images[0].filename}
                                    onClick={() =>
                                        handleNavigateToDetail(item.product.id)
                                    }
                                />
                                <div className={styles.contentProduct}>
                                    <p
                                        onClick={() =>
                                            handleNavigateToDetail(
                                                item.product.id
                                            )
                                        }
                                    >
                                        {item.product.name}
                                    </p>
                                    <p className={styles.skuProduct}>
                                        SKU: <span>{item.product.sku}</span>
                                    </p>
                                    <p className={styles.priceProduct}>
                                        {getPriceRange(
                                            item.product.productDetails
                                        )}
                                    </p>
                                </div>
                            </td>

                            <td className={styles.price}>
                                <span>
                                    {getPriceRange(item.product.productDetails)}
                                </span>
                            </td>
                            <td className={styles.status}>
                                {item.product.status == 1 ? (
                                    <span className={styles.inStock}>
                                        ✔ In stock
                                    </span>
                                ) : (
                                    <span className={styles.outOfStock}>
                                        X Out stock
                                    </span>
                                )}
                            </td>
                            <td className={styles.actions}>
                                <div className={styles.boxBtn}>
                                    <Button
                                        content={<BsEye />}
                                        isPrimary={false}
                                        onClick={() => showDetail(item.product)}
                                        isTippy
                                        titleTippy={'Xem'}
                                    />
                                    <Button
                                        onClick={() =>
                                            navigateDetail(item.product.id)
                                        }
                                        content={'XEM CHI TIẾT'}
                                    />
                                    <Button
                                        onClick={() =>
                                            navigateDetail(item.product.id)
                                        }
                                        content={
                                            <>
                                                {' '}
                                                <BsCart3 />{' '}
                                            </>
                                        }
                                    />
                                    <Button
                                        content={<FaRegTrashCan />}
                                        isPrimary={false}
                                        onClick={() => remove(item.id)}
                                        isTippy
                                        titleTippy={'Xóa'}
                                    />
                                </div>
                                <span className={styles.createdAt}>
                                    Ngày thêm:{' '}
                                    {moment(item.createdAt).format(
                                        'DD-MM-YYYY'
                                    )}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WishListTable;
