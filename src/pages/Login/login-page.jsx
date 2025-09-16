import Login from '@/components/content-side-bar/login/login';
import MyFooter from '@/components/footer/footer';
import Header from '@/components/header/header';
import MainLayout from '@/components/layout/layout';
import PageHeader from '@/components/page-header/page-header';
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
