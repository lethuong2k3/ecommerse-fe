import { deleteItem } from '@apis/cartService';
import styles from './styles.module.scss';
import { TfiClose } from 'react-icons/tfi';
import { useContext, useState } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import Cookies from 'js-cookie';
import Loading from '@components/Loading/Loading';
import LoadMore from '@components/Loading/LoadMore';

function ItemProduct({
    src,
    name,
    price,
    sku,
    quantity,
    size,
    color,
    orderItemId,
}) {
    const [isDelete, setIsDelete] = useState(false);
    const { handleGetListProductsCart } = useContext(SidebarContext);
    const userId = Cookies.get('id');
    const handleRemoveItem = () => {
        setIsDelete(true);
        deleteItem(orderItemId)
            .then(res => {
                setIsDelete(false);

                handleGetListProductsCart(userId, 'cart');
            })
            .catch(err => {
                setIsDelete(false);
            });
    };
    return (
        <div className={styles.container}>
            <img src={src} alt='' />
            <div className={styles.boxClose} onClick={handleRemoveItem}>
                <TfiClose size='14px' />
            </div>
            <div className={styles.boxContent}>
                <div className={styles.title}>{name}</div>
                <div className={styles.size}>
                    {color}, {size}
                </div>

                <div className={styles.price}>
                    {quantity} x ${price}
                </div>
                <div className={styles.price}>SKU: {sku}</div>
            </div>
            {isDelete && (
                <div className={styles.overlayLoading}>
                    <LoadMore />
                </div>
            )}
        </div>
    );
}

export default ItemProduct;
