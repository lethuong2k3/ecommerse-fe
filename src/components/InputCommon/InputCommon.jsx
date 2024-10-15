import styles from './styles.module.scss';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function InputCommon({ label, type, isRequired = false }) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const isShowTestPassword =
        type === 'password' && showPassword ? 'text' : type;

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className={styles.container}>
            <div className={styles.labelInput}>
                {label} {isRequired && <span>*</span>}
            </div>
            <div className={styles.boxInput}>
                <input type={isShowTestPassword} />
                {isPassword && (
                    <div
                        className={styles.boxIcon}
                        onClick={handleShowPassword}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputCommon;
