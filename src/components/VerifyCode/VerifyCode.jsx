import PinInput from 'react-pin-input';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { useEffect, useState } from 'react';
import { resend } from '@apis/authService';
import LoadMore from '@components/Loading/LoadMore';

function VerifyCode({ setCode, handleActiveCode, email }) {
    const [counter, setCounter] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        let timer;
        if (isResendDisabled && counter > 0) {
            timer = setInterval(() => {
                setCounter(prev => prev - 1);
            }, 1000);
        } else if (counter === 0) {
            setIsResendDisabled(false);
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [counter, isResendDisabled]);
    const handleCodeComplete = value => {
        setCode(value);
    };
    const handleResendOtp = () => {
        if (isLoading) return;
        setIsLoading(true);
        resend(email)
            .then(res => {
                setIsLoading(false);
                setCounter(60);
                setIsResendDisabled(true);
                console.log(res.data);
            })
            .catch(err => {
                setIsLoading(false);

                console.log(err);
            });
    };
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Xác minh mã</h2>
            <p className={styles.desc}>
                Vui lòng nhập mã đã được gửi đến email {email}.
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
            <div className={styles.btnResend}>
                {isResendDisabled ? (
                    <Button
                        content={`Gửi lại sau ${counter}s`}
                        isPrimary={false}
                    />
                ) : (
                    <Button
                        content={<>{isLoading ? <LoadMore /> : 'Gửi lại mã'}</>}
                        onClick={handleResendOtp}
                    />
                )}
            </div>
            <div className={styles.btn}>
                <Button content={'Xác nhận'} onClick={handleActiveCode} />
            </div>
        </div>
    );
}

export default VerifyCode;
