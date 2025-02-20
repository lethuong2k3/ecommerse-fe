import styles from './styles.module.scss';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function InputCommon({ label, type, isRequired = false, ...props }) {
    const { formik, id } = props;
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const isShowTestPassword =
        type === 'password' && showPassword ? 'text' : type;

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const isErr = formik.touched[id] && formik.errors[id];
    const messageErr = formik.errors[id];
    const Comp = type === 'textarea' ? 'textarea' : 'input';
    return (
        <div className={styles.container}>
            {label && (
                <div className={styles.labelInput}>
                    {label} {isRequired && <span>*</span>}
                </div>
            )}
            <div
                className={styles.boxInput}
                style={{ height: type === 'textarea' ? '100%' : '' }}
            >
                <Comp
                    type={isShowTestPassword}
                    {...props}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values[id]}
                />
                {isPassword && (
                    <div
                        className={styles.boxIcon}
                        onClick={handleShowPassword}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                )}
                {isErr && <div className={styles.errMessage}>{messageErr}</div>}
            </div>
        </div>
    );
}

export default InputCommon;
