import Button from '@components/Button/Button';
import styles from '../../styles.module.scss';
import cls from 'classnames';
import { useContext } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import LoadingCart from '@pages/Cart/components/Loading';
import { useNavigate } from 'react-router-dom';

const CartSummary = () => {
    const { listProductCart, isLoading } = useContext(SidebarContext);
    const navigate = useNavigate();
    const handleBackToShop = () => {
        navigate('/shop');
    };
    const total = listProductCart.reduce((acc, item) => {
        return acc + item.totalPrice;
    }, 0);
    const srcMethods = [
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/visa.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/master-card.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/paypal.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/american-express.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/maestro.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/bitcoin.jpeg',
    ];
    return (
        <div className={styles.containerRight}>
            <div className={styles.containerSummary}>
                <div className={styles.title}>CART TOTALS</div>
                <div className={cls(styles.boxTotal, styles.subTotal)}>
                    <div>Subtotal</div>
                    <div className={styles.price}>${total.toFixed(2)}</div>
                </div>
                <div className={cls(styles.boxTotal, styles.totals)}>
                    <div>Total</div>
                    <div>${total.toFixed(2)}</div>
                </div>
                <div className={styles.boxBtn}>
                    <Button content={'PROCEED TO CHECKOUT'} />
                    <Button
                        content={'CONTINUE SHOPPING'}
                        onClick={handleBackToShop}
                        isPrimary={false}
                    />
                </div>
                {isLoading && <LoadingCart />}
            </div>
            <div className={styles.containerMethods}>
                <div className={styles.titleMethods}>
                    Guaranteed <span>safe</span> checkout
                </div>
                <div className={styles.boxImgMethods}>
                    {srcMethods.map((src, key) => {
                        return (
                            <img
                                key={key}
                                src={src}
                                alt=''
                                className={styles.imgMethods}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={styles.textSecure}>Your Payment is 100% Secure</div>
        </div>
    );
};

export default CartSummary;
