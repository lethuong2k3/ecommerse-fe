import CartTable from '@pages/Cart/components/contents/CartTable';
import styles from '../../styles.module.scss';
import CartSummary from '@pages/Cart/components/contents/CartSummary';
import Button from '@components/Button/Button';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useContext } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import { updateItem, deleteItem, deleteCart } from '@apis/cartService';
import { BsCart3 } from 'react-icons/bs';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '@contexts/ToastProvider';

function Contents() {
    const {
        listProductCart,
        handleGetListProductsCart,
        isLoading,
        setIsLoading,
    } = useContext(SidebarContext);
    const { toast } = useContext(ToastContext);

    const userId = Cookies.get('id');
    const navigate = useNavigate();
    const handleQuantityChange = (orderItemId, data) => {
        setIsLoading(true);
        updateItem(orderItemId, data)
            .then(resp => {
                if (resp.data.errors) {
                    toast.error(resp.data.errors['400']);
                    setIsLoading(false);

                    return;
                }
                handleGetListProductsCart(userId, 'cart');
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            });
    };
    const handleDeleteItemCart = orderItemId => {
        setIsLoading(true);
        deleteItem(orderItemId)
            .then(resp => {
                handleGetListProductsCart(userId, 'cart');
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            });
    };
    const handleDeleteCart = () => {
        setIsLoading(true);
        deleteCart()
            .then(resp => {
                handleGetListProductsCart(userId, 'cart');
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            });
    };
    const handleNavigateToShop = () => {
        navigate('/shop');
    };
    return (
        <>
            {listProductCart.length > 0 && userId ? (
                <div className={styles.containerContents}>
                    <div style={{ width: '60%' }}>
                        <CartTable
                            listProductCart={listProductCart}
                            getData={handleQuantityChange}
                            getDataDelete={handleDeleteItemCart}
                            isLoading={isLoading}
                        />
                        <div className={styles.boxFooter}>
                            <div className={styles.boxCoupon}>
                                <input type='text' placeholder='Coupon Code' />
                                <Button content={'OK'} isPrimary={false} />
                            </div>
                            <div className={styles.boxBtnDelete}>
                                <Button
                                    content={
                                        <div>
                                            <FaRegTrashCan size={14} /> CLEAR
                                            SHOPPING CART
                                        </div>
                                    }
                                    isPrimary={false}
                                    onClick={handleDeleteCart}
                                />
                            </div>
                        </div>
                    </div>
                    <CartSummary />
                </div>
            ) : (
                <div className={styles.boxEmptyCart}>
                    <BsCart3 size={40} />
                    <div className={styles.titleEmpty}>
                        YOUR SHOPPING CART IS EMPTY
                    </div>
                    <div>
                        We invite you to get acquainted with an assortment of
                        our shop. Surely you can find something for yourself!
                    </div>
                    <div className={styles.boxBtnEmpty}>
                        <Button
                            content={'RETURN TO SHOP'}
                            onClick={handleNavigateToShop}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Contents;
