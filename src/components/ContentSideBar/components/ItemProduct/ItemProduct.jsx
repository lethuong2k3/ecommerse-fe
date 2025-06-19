import styles from './styles.module.scss';
import Cookies from 'js-cookie';
import LoadMore from '@components/Loading/LoadMore';
import { deleteItem } from '@apis/cartService';
import { TfiClose } from 'react-icons/tfi';
import { useContext, useState } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import { deleteWishList } from '@apis/wishlistService';
import { deleteCompare } from '@apis/compareService';
import { formatPrice } from '@hooks/useFomatPrice';

function ItemProduct({
    src,
    name,
    price,
    sku,
    quantity,
    size,
    color,
    item,
    isViewCart = false,
}) {
    const [isDelete, setIsDelete] = useState(false);
    const {
        handleGetListProductsCart,
        handleGetListWishList,
        handleGetListCompare,
        type,
    } = useContext(SidebarContext);
    const userId = Cookies.get('id');
    const handleRemoveItem = () => {
        setIsDelete(true);
        switch (type) {
            case 'cart':
                deleteItem(item.id)
                    .then(res => {
                        setIsDelete(false);
                        handleGetListProductsCart(userId);
                    })
                    .catch(err => {
                        console.log(err);
                        setIsDelete(false);
                    });
                break;
            case 'wishlist':
                deleteWishList(item.id)
                    .then(res => {
                        setIsDelete(false);
                        handleGetListWishList(userId);
                    })
                    .catch(err => {
                        console.log(err);
                        setIsDelete(false);
                    });
                break;
            case 'compare':
                deleteCompare(item.id)
                    .then(res => {
                        setIsDelete(false);
                        handleGetListCompare(userId);
                    })
                    .catch(err => {
                        console.log(err);
                        setIsDelete(false);
                    });
        }
    };
    return (
        <div className={styles.container}>
            <img src={src} alt='' />
            <div className={styles.boxClose} onClick={handleRemoveItem}>
                <TfiClose size='14px' />
            </div>
            <div className={styles.boxContent}>
                <div className={styles.title}>{name}</div>
                {isViewCart && (
                    <>
                        <div className={styles.size}>
                            {color}, {size}
                        </div>
                        <div className={styles.price}>
                            {quantity} x {formatPrice(price)}
                        </div>
                    </>
                )}

                <div className={styles.sku}>SKU: {sku}</div>
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
