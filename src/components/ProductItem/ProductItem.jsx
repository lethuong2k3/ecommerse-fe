import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import { faBagShopping, faRotate } from '@fortawesome/free-solid-svg-icons';
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';

function ProductItem({ src, prevSrc, name, price }) {
    return (
        <div>
            <div className={styles.boxImg}>
                <img src={src} alt='' />
                <img src={prevSrc} alt='' className={styles.showImgWhenHover} />
                <div className={styles.showFncWhenHover}>
                    <div className={styles.boxIcon}>
                        <FontAwesomeIcon icon={faBagShopping} />
                    </div>
                    <div className={styles.boxIcon}>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div className={styles.boxIcon}>
                        <FontAwesomeIcon icon={faRotate} />
                    </div>
                    <div className={styles.boxIcon}>
                        <FontAwesomeIcon icon={faEye} />
                    </div>
                </div>
            </div>
            <div className={styles.title}>{name}</div>
            <div className={styles.price}>{price}</div>
        </div>
    );
}

export default ProductItem;
