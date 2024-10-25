import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { BsHeart } from 'react-icons/bs';
import styles from './styles.module.scss';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';

function WishList() {
    return (
        <div className={styles.container}>
            <div>
                <HeaderSideBar
                    icon={<BsHeart size='24px' />}
                    title='WISHLIST'
                />
                <ItemProduct />
            </div>
            <div className={styles.boxBtn}>
                <Button content={'VIEW WISHLIST'} />
                <Button content={'ADD ALL TO CART'} isPrimary={false} />
            </div>
        </div>
    );
}

export default WishList;
