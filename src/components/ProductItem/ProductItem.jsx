import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import { faBagShopping, faRotate } from '@fortawesome/free-solid-svg-icons';
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';

function ProductItem({ src, prevSrc, name, price }) {
    return (
        <div>
            <div className={styles.boxImg}>
                <img
                    src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg'
                    alt='image-1.1'
                />
                <img
                    src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.2-min.jpg'
                    alt='image-1.2'
                    className={styles.showImgWhenHover}
                />
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
            <div className={styles.title}>10K Yellow Gold</div>
            <div className={styles.price}>$99.99</div>
        </div>
    );
}

export default ProductItem;
