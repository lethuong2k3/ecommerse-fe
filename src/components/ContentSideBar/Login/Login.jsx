import InputCommon from '@components/InputCommon/InputCommon';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '@contexts/ToastProvider';
import { register, signIn } from '@apis/authService';
import Cookies from 'js-cookie';
import { SidebarContext } from '@contexts/SideBarProvider';
import { StoreContext } from '@contexts/StoreProvider';

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const { toast } = useContext(ToastContext);
    const [isLoading, setIsLoading] = useState(false);
    const { setIsOpen } = useContext(SidebarContext);
    const { setUserId } = useContext(StoreContext);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            cfmpassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            cfmpassword: Yup.string().oneOf(
                [Yup.ref('password'), null],
                'Passwords must match'
            ),
        }),
        onSubmit: async values => {
            if (isLoading) return;
            const { email: username, password } = values;
            setIsLoading(true);
            if (isRegister) {
                await register({ username, password })
                    .then(res => {
                        toast.success(res.data.message);
                        setIsLoading(false);
                    })
                    .catch(err => {
                        toast.error(err.response.data.message);
                        setIsLoading(false);
                    });
            }
            if (!isRegister) {
                await signIn({ username, password })
                    .then(res => {
                        setIsLoading(false);
                        const { id, token, refreshToken } = res.data;
                        setUserId(id);
                        Cookies.set('token', token);
                        Cookies.set('refreshToken', refreshToken);
                        Cookies.set('userId', id);
                        toast.success('Sign in successfully!');
                        setIsOpen(false);
                    })
                    .catch(error => {
                        setIsLoading(false);
                    });
            }
        },
    });

    const handleToggle = () => {
        setIsRegister(!isRegister);
        formik.resetForm();
    };

    return (
        <div className={styles.container}>
            <HeaderSideBar title={isRegister ? 'SIGN UP' : 'SIGN IN'} />
            <form onSubmit={formik.handleSubmit}>
                <InputCommon
                    id='email'
                    label='Username or email'
                    type='text'
                    isRequired
                    formik={formik}
                />
                <InputCommon
                    id='password'
                    label='Password'
                    type='password'
                    isRequired
                    formik={formik}
                />

                {isRegister && (
                    <InputCommon
                        id='cfmpassword'
                        label='Confirm password'
                        type='password'
                        isRequired
                        formik={formik}
                    />
                )}

                {!isRegister && (
                    <div className={styles.boxRememberMe}>
                        <input type='checkbox' />
                        <span>Remember me</span>
                    </div>
                )}
                <div className={styles.boxBtn}>
                    <Button
                        type='submit'
                        content={
                            isLoading
                                ? 'Loading...'
                                : isRegister
                                ? 'REGISTER'
                                : 'LOGIN'
                        }
                    />
                </div>
            </form>
            <Button
                type='submit'
                content={
                    isRegister
                        ? 'Already have an account?'
                        : "Don't have an account"
                }
                isPrimary={false}
                style={{ marginTop: '10px', width: '100%' }}
                onClick={handleToggle}
            />

            {!isRegister && (
                <div className={styles.lostPw}>Lost your password?</div>
            )}
        </div>
    );
}

export default Login;
