import Banner from '@components/Banner/Banner';
import Header from '@components/Header/Header';
import styles from './styles.module.scss';
import AdvanceHeadling from '@components/AdvanceHeadling/AdvanceHeadling';
import Info from '@components/Info/Info';
import PopularProduct from '@components/PopularProduct/PopularProduct';
import { useEffect, useState } from 'react';
import { getProducts } from '@apis/productsService';
import MainLayout from '@components/Layout/Layout';
import SaleHomePage from '@components/SaleHomePage/SaleHomePage';
import MyFooter from '@components/Footer/Footer';
import Loading from '@components/Loading/Loading';

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
