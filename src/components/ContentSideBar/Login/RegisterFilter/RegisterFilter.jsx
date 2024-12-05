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

function RegisterFilter({ onIncrease }) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useContext(ToastContext);
    const { setIsOpen } = useContext(SidebarContext);
    const { setUserId } = useContext(StoreContext);

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
                    setIsLoading(false);
                    const { userId, token, refreshToken } = res.data.data;
                    Cookies.set('token', token);
                    Cookies.set('refreshToken', refreshToken);
                    Cookies.set('id', userId);
                    setUserId(userId);
                    toast.success('Register successfully!');
                    setIsOpen(false);
                    formik.resetForm();
                })
                .catch(err => {
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
                    id='name'
                    label='Name'
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
                <InputCommon
                    id='cfmpassword'
                    label='Confirm password'
                    type='password'
                    isRequired
                    formik={formik}
                />
                <div className={styles.boxBtn}>
                    <Button
                        type='submit'
                        content={isLoading ? 'Loading...' : 'REGISTER'}
                    />
                </div>
            </form>
            <Button
                type='button'
                content={'Already have an account?'}
                isPrimary={false}
                style={{ marginTop: '10px', width: '100%' }}
                onClick={onIncrease}
            />
        </>
    );
}

export default RegisterFilter;
