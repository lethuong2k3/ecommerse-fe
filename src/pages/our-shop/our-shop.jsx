import Header from '@/components/header/header';
import MainLayout from '@/components/layout/layout';
import styles from './styles.module.scss';
import Banner from '@/pages/our-shop/components/banner';
import { OurShopProvider } from '@/contexts/our-shop-provider';
import Filter from '@/pages/our-shop/components/filter';
import ListProducts from '@/pages/our-shop/components/list-products';
import MyFooter from '@/components/footer/footer';
import Breadcrumbs from '@/components/bread-crumbs/bread-crumbs';

function OurShop() {
    return (
        <OurShopProvider>
            <Header />
            <MainLayout>
                <div className={styles.container}>
                    <Breadcrumbs title={'Shop'} />
                </div>
                <Banner />
                <div>
                    <Filter />
                    <ListProducts />
                </div>
            </MainLayout>
            <MyFooter />
        </OurShopProvider>
    );
}

export default OurShop;
