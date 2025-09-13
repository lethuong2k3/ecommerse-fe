import { useFormik } from 'formik';
import { signIn } from '@apis/authService';
import * as Yup from 'yup';
import { StoreContext } from '@contexts/StoreProvider';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { ToastContext } from '@contexts/ToastProvider';
import InputCommon from '@components/InputCommon/InputCommon';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';
import LoadMore from '@components/Loading/LoadMore';
import { SidebarContext } from '@contexts/SideBarProvider';

function LoginFilter({ onIncrease, location }) {
    const [isLoading, setIsLoading] = useState(false);
    const { setUserId } = useContext(StoreContext);
    const { toast } = useContext(ToastContext);
    const { setIsOpen } = useContext(SidebarContext);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Vui lòng nhập email'),
            password: Yup.string()
                .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
                .required('Vui lòng nhập mật khẩu'),
        }),
        onSubmit: async values => {
            if (isLoading) return;
            const { email, password } = values;
            setIsLoading(true);

            await signIn({ email, password })
                .then(res => {
                    setIsOpen(false);
                    setIsLoading(false);
                    const { userId, token, refreshToken } = res.data.data;
                    Cookies.set('token', token);
                    Cookies.set('refreshToken', refreshToken);
                    Cookies.set('id', userId);
                    setUserId(userId);
                    formik.resetForm();
                    toast.success('Đăng nhập thành công');
                    if (location.pathname === '/dang-nhap') {
                        navigate('/');
                    }
                })
                .catch(error => {
                    if (error.status === 400) {
                        formik.errors.email = error.response.data.data;
                    }
                    setIsLoading(false);
                });
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <InputCommon
                    id='email'
                    label='Email'
                    type='text'
                    isRequired
                    formik={formik}
                />
                <InputCommon
                    id='password'
                    label='Mật khẩu'
                    type='password'
                    isRequired
                    formik={formik}
                />
                <div className={styles.boxRememberMe}>
                    <input type='checkbox' />
                    <span>Ghi nhớ</span>
                </div>
                <div className={styles.boxBtn}>
                    <Button
                        type='submit'
                        content={<>{isLoading ? <LoadMore /> : 'Đăng nhập'}</>}
                    />
                </div>
            </form>
            <Button
                type='button'
                content={'Bạn không có tài khoản?'}
                isPrimary={false}
                style={{ marginTop: '10px', width: '100%' }}
                onClick={onIncrease}
            />
        </>
    );
}

export default LoginFilter;
