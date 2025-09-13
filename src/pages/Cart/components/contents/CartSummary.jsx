import Button from '@components/Button/Button';
import styles from '../../styles.module.scss';
import cls from 'classnames';
import LoadingCart from '@pages/Cart/components/Loading';
import { useContext } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@hooks/useFomatPrice';

import PaymentMethods from '@components/PaymentMethods/PaymentMethods';

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
