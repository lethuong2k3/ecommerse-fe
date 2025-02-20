import Button from '@components/Button/Button';
import styles from './styles.module.scss';

function EmptyItem({ icon, title, handleNavigateToShop }) {
    return (
        <div className={styles.boxEmptyCart}>
            {icon}
            <div className={styles.titleEmpty}>YOUR {title} IS EMPTY</div>
            <div>
                We invite you to get acquainted with an assortment of our shop.
                Surely you can find something for yourself!
            </div>
            <div className={styles.boxBtnEmpty}>
                <Button
                    content={'RETURN TO SHOP'}
                    onClick={handleNavigateToShop}
                />
            </div>
        </div>
    );
}

export default EmptyItem;
