import styles from './styles.module.scss';
import CountDownBanner from '@components/CountDownBanner/CountDownBanner';
import ProductItem from '@components/ProductItem/ProductItem';

function HeadlingListProducts({ data }) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.firstRow}>
                    <CountDownBanner />
                    {data.slice(0, 2).map(item => (
                        <ProductItem
                            key={item.id}
                            src={item.images[0].url}
                            prevSrc={item.images[1].url}
                            name={item.name}
                            item={item}
                        />
                    ))}
                </div>
                <div className={styles.secondRow}>
                    {data.slice(2).map(item => (
                        <ProductItem
                            key={item.id}
                            src={item.images[0].url}
                            prevSrc={item.images[1].url}
                            name={item.name}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default HeadlingListProducts;
