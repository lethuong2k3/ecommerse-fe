import styles from './styles.module.scss';
import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import RegisterFilter from '@components/ContentSideBar/Login/RegisterFilter/RegisterFilter';
import LoginFilter from '@components/ContentSideBar/Login/LoginFilter/LoginFilter';
import { useCallback, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarContext } from '@contexts/SideBarProvider';

function Login() {
    const { setIsOpen } = useContext(SidebarContext);

    const [isRegister, setIsRegister] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const handleIncreaseToggle = useCallback(() => {
        setIsRegister(!isRegister);
    }, [isRegister]);

    const handleNavigate = () => {
        setIsOpen(false);
        navigate('/dang-nhap');
    };

    return (
        <div className={styles.container}>
            <HeaderSideBar
                title={isRegister ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP'}
                handleNavigate={handleNavigate}
            />
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
