import MyFooter from '@/components/footer/footer';
import Header from '@/components/header/header';
import Contents from '@/pages/cart/components/contents/contents';
import styles from './styles.module.scss';
import MainLayout from '@/components/layout/layout';
import Steps from '@/components/steps/steps';

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
