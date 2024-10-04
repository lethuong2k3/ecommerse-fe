import Banner from '@components/Banner/Banner';
import Header from '@components/Header/Header';
import styles from './styles.module.scss';
import AdvanceHeadling from '@components/AdvanceHeadling/AdvanceHeadling';
import Info from '@components/Info/Info';
import PopularProduct from '@components/PopularProduct/PopularProduct';
import { useEffect, useState } from 'react';
import getProducts from '@apis/productsService';
import MainLayout from '@components/Layout/Layout';

function HomePage() {
    const [lstProduct, setLstProducts] = useState([]);
    useEffect(() => {
        getProducts().then(res => {
            setLstProducts(res.contents);
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
                    <PopularProduct data={lstProduct} />
                </MainLayout>
            </div>
        </>
    );
}

export default HomePage;
