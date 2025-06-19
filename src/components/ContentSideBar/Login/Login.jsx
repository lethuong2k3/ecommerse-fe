import styles from './styles.module.scss';
import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import RegisterFilter from '@components/ContentSideBar/Login/RegisterFilter/RegisterFilter';
import LoginFilter from '@components/ContentSideBar/Login/LoginFilter/LoginFilter';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const location = useLocation();
    const handleIncreaseToggle = useCallback(() => {
        setIsRegister(!isRegister);
    }, [isRegister]);

    return (
        <div className={styles.container}>
            <HeaderSideBar title={isRegister ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP'} />
            {isRegister ? (
                <RegisterFilter onIncrease={handleIncreaseToggle} />
            ) : (
                <LoginFilter
                    onIncrease={handleIncreaseToggle}
                    location={location}
                />
            )}

            {!isRegister && <div className={styles.lostPw}>Quên mật khẩu?</div>}
        </div>
    );
}

export default Login;
