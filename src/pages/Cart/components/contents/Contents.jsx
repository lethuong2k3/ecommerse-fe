import CartTable from '@pages/Cart/components/contents/CartTable';
import styles from '../../styles.module.scss';
import CartSummary from '@pages/Cart/components/contents/CartSummary';
import Button from '@components/Button/Button';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useContext } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import { updateItem } from '@apis/cartService';
import Cookies from 'js-cookie';

function Contents() {
    const {
        listProductCart,
        handleGetListProductsCart,
        isLoading,
        setIsLoading,
    } = useContext(SidebarContext);
    const userId = Cookies.get('id');
    const handleQuantityChange = (orderItemId, data) => {
        setIsLoading(true);
        updateItem(orderItemId, data)
            .then(resp => {
                handleGetListProductsCart(userId, 'cart');
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            });
    };
    return (
        <div className={styles.containerContents}>
            <div style={{ width: '60%' }}>
                <CartTable
                    listProductCart={listProductCart}
                    getData={handleQuantityChange}
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
                                    <FaRegTrashCan size={14} /> CLEAR SHOPPING
                                    CART
                                </div>
                            }
                            isPrimary={false}
                        />
                    </div>
                </div>
            </div>
            <CartSummary />
        </div>
    );
}

export default Contents;
