import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import styles from './styles.module.scss';
import { BsCart3 } from 'react-icons/bs';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';

function Cart() {
    return (
        <div className={styles.container}>
            <div>
                <HeaderSideBar icon={<BsCart3 size='24px' />} title='CART' />
                <ItemProduct />
            </div>
            <div>
                <div className={styles.total}>
                    <p>SUBTOTAL: </p>
                    <p>$199.99</p>
                </div>
                <div className={styles.boxBtn}>
                    <Button content={'VIEW CART'} />
                    <Button content={'CHECKOUT'} isPrimary={false} />
                </div>
            </div>
        </div>
    );
}

export default Cart;
