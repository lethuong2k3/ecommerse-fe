import Banner from '@components/Banner/Banner';
import Header from '@components/Header/Header';
import styles from './styles.module.scss';
import AdvanceHeadling from '@components/AdvanceHeadling/AdvanceHeadling';
import Info from '@components/Info/Info';
import PopularProduct from '@components/PopularProduct/PopularProduct';
import { useEffect, useState } from 'react';
import getProducts from '@apis/productsService';
import MainLayout from '@components/Layout/Layout';
import SaleHomePage from '@components/SaleHomePage/SaleHomePage';

function HomePage() {
    const [lstProduct, setLstProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getProducts().then(res => {
            setLstProducts(res.contents);
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
                        <div className={styles.loader}></div>
                    ) : (
                        <PopularProduct data={lstProduct} />
                    )}
                </MainLayout>
                <SaleHomePage />
            </div>
        </>
    );
}

export default HomePage;
