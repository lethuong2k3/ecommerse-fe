import { useFormik } from 'formik';
import { signIn } from '@apis/authService';
import * as Yup from 'yup';
import { StoreContext } from '@contexts/StoreProvider';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { ToastContext } from '@contexts/ToastProvider';
import { SidebarContext } from '@contexts/SideBarProvider';
import InputCommon from '@components/InputCommon/InputCommon';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';

function LoginFilter({ onIncrease }) {
    const [isLoading, setIsLoading] = useState(false);
    const { setUserId } = useContext(StoreContext);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: async values => {
            if (isLoading) return;
            const { email, password } = values;
            setIsLoading(true);

            await signIn({ email, password })
                .then(res => {
                    setIsLoading(false);
                    const { userId, token, refreshToken } = res.data.data;
                    Cookies.set('token', token);
                    Cookies.set('refreshToken', refreshToken);
                    Cookies.set('id', userId);
                    setUserId(userId);
                    toast.success('Sign in successfully!');
                    formik.resetForm();
                    navigate('/');
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
                        content={isLoading ? 'Loading...' : 'Đăng nhập'}
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
