import styles from './styles.module.scss';
import CountDownBanner from '@components/CountDownBanner/CountDownBanner';
import ProductItem from '@components/ProductItem/ProductItem';

function HeadlingListProducts({ data }) {
    return (
        <div className={styles.container}>
            <CountDownBanner />
            {data.map(item => (
                <ProductItem
                    key={item.id}
                    src={item.images[0].url}
                    prevSrc={item.images[1].url}
                    name={item.name}
                    item={item}
                />
            ))}
        </div>
    );
}

export default HeadlingListProducts;
