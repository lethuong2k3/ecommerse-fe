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
import VerifyCode from '@components/VerifyCode/VerifyCode';
import { verify } from '@apis/authService';
import LoadMore from '@components/Loading/LoadMore';

function RegisterFilter({ onIncrease }) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const { toast } = useContext(ToastContext);
    const { setType } = useContext(SidebarContext);
    const { isVerify, setIsVerify } = useContext(StoreContext);
    const handleActiveCode = () => {
        let body = {
            email: email,
            verificationCode: code,
        };
        verify(body)
            .then(res => {
                onIncrease();
                setIsVerify(false);
                setType('login');
                toast.success(res.data.data);
            })
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.response.data);
                }
                console.log(err);
            });
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            cfmpassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email không đúng định dạng.')
                .required('Vui lòng nhập email.'),
            name: Yup.string().required('Vui lòng nhập tên.'),
            password: Yup.string()
                .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
                .required('Vui lòng nhập mật khẩu.'),
            cfmpassword: Yup.string()
                .oneOf(
                    [Yup.ref('password'), null],
                    'Mật khẩu không trùng khớp.'
                )
                .required('Vui lòng xác nhận mật khẩu.'),
        }),
        onSubmit: async values => {
            if (isLoading) return;
            const { email, name, password } = values;
            setIsLoading(true);
            await register({ email, name, password })
                .then(res => {
                    if (!res.enabled) {
                        console.log(res);
                        setEmail(res.data.data.email);
                        setIsVerify(true);
                        setIsLoading(false);
                        return;
                    }
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
                    email={email}
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
                                content={
                                    <>{isLoading ? <LoadMore /> : 'Đăng ký'}</>
                                }
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
