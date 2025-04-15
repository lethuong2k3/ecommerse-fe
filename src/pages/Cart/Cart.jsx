import MyFooter from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Contents from '@pages/Cart/components/contents/Contents';
import styles from './styles.module.scss';
import MainLayout from '@components/Layout/Layout';
import Steps from '@components/Steps/Steps';

function Cart() {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <Steps className={styles.resPhoneTablet} step={1} />
                <MainLayout>
                    <Contents />
                </MainLayout>
            </div>
            <MyFooter />
        </>
    );
}

export default Cart;
