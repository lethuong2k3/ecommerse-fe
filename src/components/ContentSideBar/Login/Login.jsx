import InputCommon from '@components/InputCommon/InputCommon';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
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
    });
    return (
        <div className={styles.container}>
            <HeaderSideBar title='Login' />
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

                <div className={styles.boxRememberMe}>
                    <input type='checkbox' />
                    <span>Remember me</span>
                </div>
                <div className={styles.boxBtn}>
                    <Button type='submit' content={'LOGIN'} />
                </div>
            </form>
            <div className={styles.lostPw}>Lost your password?</div>
        </div>
    );
}

export default Login;
