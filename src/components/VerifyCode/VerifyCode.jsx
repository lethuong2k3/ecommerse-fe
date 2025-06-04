import PinInput from 'react-pin-input';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';

function VerifyCode({ setCode, handleActiveCode }) {
    const handleCodeComplete = value => {
        setCode(value);
    };
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Xác minh mã</h2>
            <p className={styles.desc}>
                Vui lòng nhập mã đã được gửi đến email của bạn.
            </p>
            <PinInput
                onComplete={handleCodeComplete}
                length={6}
                focus
                secret
                secretDelay={500}
                inputStyle={{ borderColor: '#e1e1e1', color: '#333' }}
                inputFocusStyle={{ borderColor: 'lightgray' }}
            />
            <div className={styles.btn}>
                <Button content={'Xác nhận'} onClick={handleActiveCode} />
            </div>
        </div>
    );
}

export default VerifyCode;
