import Banner from '@/components/banner/banner';
import Header from '@/components/header/header';
import styles from './styles.module.scss';
import AdvanceHeadling from '@/components/advance-headling/advance-headling';
import Info from '@/components/info/info';
import PopularProduct from '@/components/popular-product/popular-product';
import { useEffect, useState } from 'react';
import { getProducts } from '@/apis/product-service';
import MainLayout from '@/components/layout/layout';
import SaleHomePage from '@/components/sale-home-page/sale-home-page';
import MyFooter from '@/components/footer/footer';
import Loading from '@/components/loading/loading';

function HomePage() {
    const [lstProduct, setLstProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const query = {
            page: 0,
            limit: 10,
            sortType: 0,
            categoryName: 'all',
        };
        setLoading(true);
        getProducts(query).then(res => {
            setLstProducts(res.data.content);
            setLoading(false);
        });
    }, []);
    return (
        <>
            <div className={styles.container}>
                <Header />
                <Banner />
                <MainLayout>
                    <Info />
                    <AdvanceHeadling />
                    {loading ? (
                        <Loading />
                    ) : (
                        <PopularProduct data={lstProduct} />
                    )}
                </MainLayout>
                <SaleHomePage />
                <MyFooter />
            </div>
        </>
    );
}

export default HomePage;
