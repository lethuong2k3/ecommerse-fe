import Button from '@/components/button/button';
import styles from '../../styles.module.scss';
import cls from 'classnames';
import LoadingCart from '@/pages/cart/components/loading';
import { useContext } from 'react';
import { SidebarContext } from '@/contexts/sidebar-provider';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@/hooks/fomat-price';

import PaymentMethods from '@/components/payment-methods/payment-methods';

const CartSummary = () => {
    const { listProductCart, isLoading } = useContext(SidebarContext);
    const navigate = useNavigate();
    const handleBackToShop = () => {
        navigate('/shop');
    };
    const handleNavigateToCheckout = () => {
        navigate('/thanh-toan');
    };
    const total = listProductCart.reduce((acc, item) => {
        return acc + item.totalPrice;
    }, 0);
    return (
        <div className={styles.containerRight}>
            <div className={styles.containerSummary}>
                <div className={styles.title}>TÓM TẮT ĐƠN HÀNG</div>
                <div className={cls(styles.boxTotal, styles.subTotal)}>
                    <div>Tạm tính</div>
                    <div className={styles.price}>{formatPrice(total)}</div>
                </div>
                <div className={cls(styles.boxTotal, styles.totals)}>
                    <div>Tổng tiền</div>
                    <div>{formatPrice(total)}</div>
                </div>
                <div className={styles.boxBtn}>
                    <Button
                        content={'TIẾN HÀNH ĐẶT HÀNG'}
                        onClick={handleNavigateToCheckout}
                    />
                    <Button
                        content={'MUA THÊM SẢN PHẨM'}
                        onClick={handleBackToShop}
                        isPrimary={false}
                    />
                </div>
                {isLoading && <LoadingCart />}
            </div>
            <PaymentMethods />
        </div>
    );
};

export default CartSummary;
