import styles from './styles.module.scss';
import { BsBag, BsHeart, BsEye } from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi';

function ProductItem({ src, prevSrc, name, price }) {
    return (
        <div>
            <div className={styles.boxImg}>
                <img src={src} alt='' />
                <img src={prevSrc} alt='' className={styles.showImgWhenHover} />
                <div className={styles.showFncWhenHover}>
                    <div className={styles.boxIcon}>
                        <BsBag />
                    </div>
                    <div className={styles.boxIcon}>
                        <BsHeart />
                    </div>
                    <div className={styles.boxIcon}>
                        <TfiReload />
                    </div>
                    <div className={styles.boxIcon}>
                        <BsEye />
                    </div>
                </div>
            </div>
            <div className={styles.title}>{name}</div>
            <div className={styles.price}>${price}</div>
        </div>
    );
}

export default ProductItem;
