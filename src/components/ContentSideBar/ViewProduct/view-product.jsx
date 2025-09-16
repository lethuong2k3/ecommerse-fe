import { useContext } from 'react';
import { SidebarContext } from '@/contexts/sidebar-provider';
import ProductItem from '@/components/ProductItem/product-item';
import styles from './styles.module.scss';

function ViewProduct() {
    const { product } = useContext(SidebarContext);
    return (
        <ProductItem
            key={product.id}
            src={product.images[0].url}
            prevSrc={product.images[1].url}
            name={product.name}
            item={product}
            isHomePage={false}
            isViewProduct={true}
        />
    );
}

export default ViewProduct;
