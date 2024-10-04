import styles from './styles.module.scss';
import CountDownBanner from '@components/CountDownBanner/CountDownBanner';
import ProductItem from '@components/ProductItem/ProductItem';

function HeadlingListProducts({ data }) {
    return (
        <div className={styles.container}>
            <CountDownBanner />
            {data.map(item => (
                <ProductItem
                    key={item._id}
                    src={item.images[0]}
                    prevSrc={item.images[1]}
                    name={item.name}
                    price={item.price}
                />
            ))}
        </div>
    );
}

export default HeadlingListProducts;
