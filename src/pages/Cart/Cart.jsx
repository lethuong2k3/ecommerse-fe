import MyFooter from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Steps from '@pages/Cart/components/steps/Steps';
import Contents from '@pages/Cart/components/contents/Contents';
import styles from './styles.module.scss';

function Cart() {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <Steps />
                <Contents />
            </div>
            <MyFooter />
        </>
    );
}

export default Cart;