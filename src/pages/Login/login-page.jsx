import Login from '@/components/ContentSideBar/Login/login';
import MyFooter from '@/components/Footer/footer';
import Header from '@/components/Header/header';
import MainLayout from '@/components/Layout/layout';
import PageHeader from '@/components/PageHeader/page-header';
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
