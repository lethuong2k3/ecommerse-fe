import Banner from '@components/Banner/Banner';
import Header from '@components/Header/Header';
import styles from './styles.module.scss';
import AdvanceHeadling from '@components/AdvanceHeadling/AdvanceHeadling';
import Info from '@components/Info/Info';
import HeadlingListProducts from '@components/HeadingListProducts/HeadingListProducts';

function HomePage() {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <Banner />
                <Info />
                <AdvanceHeadling />
                <HeadlingListProducts />
            </div>
        </>
    );
}

export default HomePage;
