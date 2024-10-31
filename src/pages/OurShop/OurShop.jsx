import Header from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import Banner from '@/pages/OurShop/components/Banner';
import { OurShopProvider } from '@contexts/OurShopProvider';
import Filter from '@pages/OurShop/components/Filter';
import ListProducts from '@pages/OurShop/components/ListProducts';

function OurShop() {
    const navigate = useNavigate();
    const handleBackPreviosPage = () => {
        navigate(-1);
    };
    return (
        <OurShopProvider>
            <Header />
            <MainLayout>
                <div className={styles.container}>
                    <div className={styles.functionBox}>
                        <div>
                            Home &gt;{' '}
                            <span className={styles.specialText}>Shop</span>{' '}
                        </div>
                        <div className={styles.functionBox}>
                            <div
                                className={styles.btnBack}
                                onClick={() => handleBackPreviosPage()}
                            >
                                &lt; Return to previos page
                            </div>
                        </div>
                    </div>
                </div>
                <Banner />
                <div>
                    <Filter />
                    <ListProducts />
                </div>
            </MainLayout>
        </OurShopProvider>
    );
}

export default OurShop;
