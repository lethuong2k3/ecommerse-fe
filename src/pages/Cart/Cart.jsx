import MyFooter from '@/components/Footer/footer';
import Header from '@/components/Header/header';
import Contents from '@/pages/Cart/components/contents/contents';
import styles from './styles.module.scss';
import MainLayout from '@/components/Layout/layout';
import Steps from '@/components/Steps/steps';

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
