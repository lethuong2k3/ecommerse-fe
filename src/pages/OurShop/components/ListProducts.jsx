import MainLayout from '@components/Layout/Layout';
import { useContext } from 'react';
import { OurShopContext } from '@contexts/OurShopProvider';
import ProductItem from '@components/ProductItem/ProductItem';
import styles from '../styles.module.scss';

function ListProducts() {
    const { products, isShowGrid } = useContext(OurShopContext);
    return (
        <>
            <MainLayout>
                <div className={isShowGrid ? styles.containerProduct : ''}>
                    {products.map(item => (
                        <ProductItem
                            key={item.id}
                            src={item.images[0].url}
                            prevSrc={item.images[1].url}
                            name={item.name}
                            item={item}
                            isHomePage={false}
                        />
                    ))}
                </div>
            </MainLayout>
        </>
    );
}

export default ListProducts;
