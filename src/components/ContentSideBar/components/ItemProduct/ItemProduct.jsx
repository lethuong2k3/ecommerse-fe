import styles from './styles.module.scss';
import { TfiClose } from 'react-icons/tfi';

function ItemProduct() {
    return (
        <div className={styles.container}>
            <img
                src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-2.1-min.jpg'
                alt=''
            />
            <div className={styles.boxClose}>
                <TfiClose size='14px' />
            </div>
            <div className={styles.boxContent}>
                <div className={styles.title}>Consectetur nibh at</div>
                <div className={styles.price}>$199.99</div>
            </div>
        </div>
    );
}

export default ItemProduct;
