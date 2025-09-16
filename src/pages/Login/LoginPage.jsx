import Login from '@components/ContentSideBar/Login/Login';
import MyFooter from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import PageHeader from '@components/PageHeader/PageHeader';
import { CiUser } from 'react-icons/ci';
import styles from './styles.module.scss';

function LoginPage() {
    return (
        <>
            <Header />
            <PageHeader
                icon={<CiUser size={25} />}
                title={'TÀI KHOẢN'}
                style={{ marginTop: '83px' }}
            />
            <MainLayout>
                <div className={styles.container}>
                    <Login />
                </div>
            </MainLayout>
            <MyFooter />
        </>
    );
}

export default LoginPage;
