import CartTable from '@/pages/cart/components/contents/cart-table';
import styles from '../../styles.module.scss';
import CartSummary from '@/pages/cart/components/contents/cart-summary';
import Button from '@/components/button/button';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useContext, useState } from 'react';
import { SidebarContext } from '@/contexts/sidebar-provider';
import { updateItem, deleteItem, deleteCart } from '@/apis/cart-service';
import { BsCart3 } from 'react-icons/bs';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '@/contexts/toast-provider';
import EmptyItem from '@/components/empty-item/empty-item';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { IoWarningOutline } from 'react-icons/io5';

function Contents() {
    const {
        listProductCart,
        handleGetListProductsCart,
        isLoading,
        setIsLoading,
    } = useContext(SidebarContext);
    const { toast } = useContext(ToastContext);
    const [visible, setVisible] = useState(false);
    const userId = Cookies.get('id');
    const navigate = useNavigate();
    const handleQuantityChange = (orderItemId, data) => {
        setIsLoading(true);
        updateItem(orderItemId, data)
            .then(resp => {
                if (resp.data.errors) {
                    toast.error(resp.data.errors['401']);
                    setIsLoading(false);
                    return;
                }
                handleGetListProductsCart(userId, 'cart');
                setIsLoading(false);
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
                handleGetListProductsCart(userId);
                setIsLoading(false);
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
            {listProductCart?.length > 0 && userId ? (
                <div className={styles.containerContents}>
                    <div className={styles.containerCart}>
                        <CartTable
                            listProductCart={listProductCart}
                            getData={handleQuantityChange}
                            getDataDelete={handleDeleteItemCart}
                            isLoading={isLoading}
                        />
                        <div className={styles.boxFooter}>
                            {/* <div className={styles.boxCoupon}>
                                <input type='text' placeholder='Mã giảm giá' />
                                <Button content={'OK'} isPrimary={false} />
                            </div> */}
                            <div className={styles.boxBtnDelete}>
                                <ConfirmDialog
                                    group='declarative'
                                    visible={visible}
                                    onHide={() => setVisible(false)}
                                    message='Bạn có chắc muốn xóa giỏ hàng?'
                                    header='Xác nhận'
                                    style={{ width: '50vw' }}
                                    breakpoints={{
                                        '1100px': '75vw',
                                        '960px': '100vw',
                                    }}
                                    icon={<IoWarningOutline size={30} />}
                                    accept={handleDeleteCart}
                                />
                                <Button
                                    content={
                                        <div>
                                            <FaRegTrashCan size={14} /> Xóa tất
                                            cả
                                        </div>
                                    }
                                    isPrimary={false}
                                    onClick={() => setVisible(true)}
                                />
                            </div>
                        </div>
                    </div>
                    <CartSummary />
                </div>
            ) : (
                <EmptyItem
                    icon={<BsCart3 size={40} />}
                    title={'GIỎ HÀNG'}
                    handleNavigateToShop={handleNavigateToShop}
                />
            )}
        </>
    );
}

export default Contents;
