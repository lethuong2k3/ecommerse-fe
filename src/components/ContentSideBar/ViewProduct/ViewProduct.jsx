import { useContext } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import ProductItem from '@components/ProductItem/ProductItem';
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
