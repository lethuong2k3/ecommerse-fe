import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { useCallback, useState } from 'react';
import RegisterFilter from '@components/ContentSideBar/Login/RegisterFilter/RegisterFilter';
import LoginFilter from '@components/ContentSideBar/Login/LoginFilter/LoginFilter';

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const handleIncreaseToggle = useCallback(() => {
        setIsRegister(!isRegister);
    }, [isRegister]);

    return (
        <div className={styles.container}>
            <HeaderSideBar title={isRegister ? 'SIGN UP' : 'SIGN IN'} />
            {isRegister ? (
                <RegisterFilter onIncrease={handleIncreaseToggle} />
            ) : (
                <LoginFilter onIncrease={handleIncreaseToggle} />
            )}

            {!isRegister && (
                <div className={styles.lostPw}>Lost your password?</div>
            )}
        </div>
    );
}

export default Login;
