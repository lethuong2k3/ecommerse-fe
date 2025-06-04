import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { ToastContext } from '@contexts/ToastProvider';
import { SidebarContext } from '@contexts/SideBarProvider';
import { register } from '@apis/authService';
import InputCommon from '@components/InputCommon/InputCommon';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button';
import { StoreContext } from '@contexts/StoreProvider';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import VerifyCode from '@components/VerifyCode/VerifyCode';
import { verify } from '@apis/authService';

function RegisterFilter({ onIncrease }) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const { toast } = useContext(ToastContext);
    const { setIsOpen } = useContext(SidebarContext);
    const { setUserId, isVerify, setIsVerify } = useContext(StoreContext);
    const handleActiveCode = () => {
        let body = {
            email: email,
            verificationCode: code,
        };
        console.log(body);
        verify(body)
            .then(res => {
                setIsVerify(false);
                setIsOpen(false);
                toast.success(res.data.data);
            })
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.response.data);
                }
                console.log(err);
            });
    };
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            cfmpassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
            name: Yup.string().required('Name is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            cfmpassword: Yup.string().oneOf(
                [Yup.ref('password'), null],
                'Password must match'
            ),
        }),
        onSubmit: async values => {
            if (isLoading) return;
            const { email, name, password } = values;
            setIsLoading(true);
            await register({ email, name, password })
                .then(res => {
                    if (!res.enabled) {
                        setEmail(res.data.data.email);
                        setIsVerify(true);
                        setIsLoading(false);
                        return;
                    }
                    // const { userId, token, refreshToken } = res.data.data;
                    // Cookies.set('token', token);
                    // Cookies.set('refreshToken', refreshToken);
                    // Cookies.set('id', userId);
                    // setUserId(userId);
                    // toast.success('Register successfully!');
                    // setIsOpen(false);
                    // formik.resetForm();
                    // navigate('/');
                })
                .catch(err => {
                    setIsLoading(false);
                    if (err.status === 400) {
                        formik.errors.email = err.response.data.data;
                    }
                });
        },
    });

    return (
        <>
            {isVerify ? (
                <VerifyCode
                    setCode={setCode}
                    handleActiveCode={handleActiveCode}
                />
            ) : (
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
                            id='name'
                            label='Tên'
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
                        <InputCommon
                            id='cfmpassword'
                            label='Xác nhận mật khẩu'
                            type='password'
                            isRequired
                            formik={formik}
                        />
                        <div className={styles.boxBtn}>
                            <Button
                                type='submit'
                                content={isLoading ? 'Loading...' : 'Đăng ký'}
                            />
                        </div>
                    </form>
                    <Button
                        type='button'
                        content={'Bạn đã có tài khoản?'}
                        isPrimary={false}
                        style={{ marginTop: '10px', width: '100%' }}
                        onClick={onIncrease}
                    />
                </>
            )}
        </>
    );
}

export default RegisterFilter;
