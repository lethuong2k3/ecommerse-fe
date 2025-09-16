import Banner from '@/components/Banner/banner';
import Header from '@/components/Header/header';
import styles from './styles.module.scss';
import AdvanceHeadling from '@/components/AdvanceHeadling/advance-headling';
import Info from '@/components/Info/info';
import PopularProduct from '@/components/PopularProduct/popular-product';
import { useEffect, useState } from 'react';
import { getProducts } from '@/apis/product-service';
import MainLayout from '@/components/Layout/layout';
import SaleHomePage from '@/components/SaleHomePage/sale-home-page';
import MyFooter from '@/components/Footer/footer';
import Loading from '@/components/Loading/loading';

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
