import InputCommon from '@components/InputCommon/InputCommon';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';

function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>SIGN IN</div>
            <InputCommon label='Username or email' type='text' isRequired />
            <InputCommon label='Password' type='password' isRequired />

            <div className={styles.boxRememberMe}>
                <input type='checkbox' />
                <span>Remember me</span>
            </div>
            <div className={styles.boxBtn}>
                <Button content={'LOGIN'} />
            </div>
            <div className={styles.lostPw}>Lost your password?</div>
        </div>
    );
}

export default Login;
