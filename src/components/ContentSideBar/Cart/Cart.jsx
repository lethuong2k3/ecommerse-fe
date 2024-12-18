import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import styles from './styles.module.scss';
import { BsCart3 } from 'react-icons/bs';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
import { useContext } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import LoadMore from '@components/Loading/LoadMore';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { listProductCart, isLoading, setIsOpen } =
        useContext(SidebarContext);
    const navigate = useNavigate();
    const handleNavigateToShop = () => {
        navigate('/shop');
        setIsOpen(false);
    };
    const subTotal = listProductCart.reduce((acc, item) => {
        return acc + item.totalPrice;
    }, 0);

    return (
        <div
            className={cls(styles.container, {
                [styles.isEmpty]: !listProductCart.length,
            })}
        >
            <HeaderSideBar icon={<BsCart3 size='24px' />} title='CART' />
            {listProductCart.length ? (
                <div className={styles.containerListItem}>
                    <div>
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
                                        orderItemId={item.id}
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
                            <p>SUBTOTAL: </p>
                            <p>${subTotal}</p>
                        </div>
                        <div className={styles.boxBtn}>
                            <Button content={'VIEW CART'} />
                            <Button content={'CHECKOUT'} isPrimary={false} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.boxEmpty}>
                    <div>No products in the cart.</div>
                    <div className={styles.boxBtnEmpty}>
                        <Button
                            content={'RETURN TO SHOP'}
                            onClick={handleNavigateToShop}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
