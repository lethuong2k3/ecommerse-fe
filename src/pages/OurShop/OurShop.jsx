import Header from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import Banner from '@/pages/OurShop/components/Banner';
import { OurShopProvider } from '@contexts/OurShopProvider';
import Filter from '@pages/OurShop/components/Filter';
import ListProducts from '@pages/OurShop/components/ListProducts';
import MyFooter from '@components/Footer/Footer';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';

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
