import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import styles from './styles.module.scss';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
import { BsCart3 } from 'react-icons/bs';
import { useContext } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@hooks/useFomatPrice';

import LoadMore from '@components/Loading/LoadMore';
import cls from 'classnames';

function Cart() {
    const navigate = useNavigate();
    const handleNavigateToCart = () => {
        navigate('/gio-hang');
        setIsOpen(false);
    };
    const { listProductCart, isLoading, setIsOpen } =
        useContext(SidebarContext);

    const handleNavigateToShop = () => {
        navigate('/shop');
        setIsOpen(false);
    };
    const subTotal = listProductCart?.reduce((acc, item) => {
        return acc + item.totalPrice;
    }, 0);

    return (
        <div
            className={cls(styles.container, {
                [styles.isEmpty]: !listProductCart?.length,
            })}
        >
            <HeaderSideBar
                icon={<BsCart3 size='24px' />}
                title='Giỏ hàng'
                handleNavigate={handleNavigateToCart}
            />
            {listProductCart?.length ? (
                <div className={styles.containerListItem}>
                    <div style={{ width: '100%', height: '100%' }}>
                        <div className={styles.containerListProductCart}>
                            {listProductCart?.map(item => {
                                return (
                                    <ItemProduct
                                        key={item.id}
                                        src={
                                            item.productDetail.product.images[0]
                                                .url
                                        }
                                        name={item.productDetail.product.name}
                                        price={item.itemPrice}
                                        sku={item.productDetail.product.sku}
                                        size={item.productDetail.size.name}
                                        color={item.productDetail.color.name}
                                        quantity={item.quantity}
                                        item={item}
                                        isViewCart
                                    />
                                );
                            })}
                            {isLoading && (
                                <div className={styles.overlayLoading}>
                                    <LoadMore />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className={styles.total}>
                            <p>Tổng tiền: </p>
                            <p>{formatPrice(subTotal)}</p>
                        </div>
                        <div className={styles.boxBtn}>
                            <Button
                                content={'Xem giỏ hàng'}
                                onClick={handleNavigateToCart}
                            />
                            <Button
                                content={'Thông tin giao hàng'}
                                isPrimary={false}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.boxEmpty}>
                    <div>Không có sản phẩm nào trong giỏ hàng.</div>
                    <div className={styles.boxBtnEmpty}>
                        <Button
                            content={'Đi đến shop'}
                            onClick={handleNavigateToShop}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
