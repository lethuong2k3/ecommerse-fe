import styles from './styles.module.scss';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import cls from 'classnames';

function InputCommon({
    label,
    type,
    isRequired = false,
    borderErr = false,
    ...props
}) {
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
        <div
            className={styles.container}
            style={{ margin: borderErr ? '0px' : '' }}
        >
            {label && (
                <div className={styles.labelInput}>
                    {label} {isRequired && <span>*</span>}
                </div>
            )}
            <div
                className={cls(styles.boxInput, {
                    [styles.boxInputBorder]: borderErr,
                })}
                style={{ height: type === 'textarea' ? '100%' : '' }}
            >
                <Comp
                    type={isShowTestPassword}
                    {...props}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values[id]}
                    style={{
                        border: borderErr && isErr ? '1px solid #c62828' : '',
                    }}
                />
                {isPassword && (
                    <div
                        className={styles.boxIcon}
                        onClick={handleShowPassword}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                )}
                {isErr && !borderErr && (
                    <div className={styles.errMessage}>{messageErr}</div>
                )}
            </div>
        </div>
    );
}

export default InputCommon;
