import Button from '@components/Button/Button';
import styles from './styles.module.scss';

function EmptyItem({ icon, title, handleNavigateToShop }) {
    return (
        <div className={styles.boxEmptyCart}>
            {icon}
            <div className={styles.titleEmpty}>
                {title} CHƯA CÓ SẢN PHẨM NÀO.
            </div>
            <div className={styles.contentEmpty}>
                Chúng tôi mời bạn làm quen với một số mặt hàng trong cửa hàng
                của chúng tôi. Chắc chắn bạn có thể tìm thấy thứ gì đó cho mình!
            </div>
            <div className={styles.boxBtnEmpty}>
                <Button
                    content={'QUAY VỀ SHOP'}
                    onClick={handleNavigateToShop}
                />
            </div>
        </div>
    );
}

export default EmptyItem;
