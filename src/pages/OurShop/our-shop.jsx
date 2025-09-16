import Header from '@/components/Header/header';
import MainLayout from '@/components/Layout/layout';
import styles from './styles.module.scss';
import Banner from '@/pages/OurShop/components/banner';
import { OurShopProvider } from '@/contexts/our-shop-provider';
import Filter from '@/pages/OurShop/components/filter';
import ListProducts from '@/pages/OurShop/components/list-products';
import MyFooter from '@/components/Footer/footer';
import Breadcrumbs from '@/components/Breadcrumbs/bread-crumbs';

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
