import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import Header from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';

function AboutUs() {
    return (
        <>
            <Header />
            <MainLayout>
                <div className={styles.container}>
                    <Breadcrumbs title={'About Us'} />
                    <div></div>
                </div>
            </MainLayout>
        </>
    );
}

export default AboutUs;
