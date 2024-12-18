import styles from '../../styles.module.scss';
import cls from 'classnames';

function Stepper({ number, content, isDisabled }) {
    return (
        <div className={styles.stepper}>
            <div
                className={cls(styles.numberStep, {
                    [styles.isDisabledNumber]: isDisabled,
                })}
            >
                {number}
            </div>
            <div
                className={cls(styles.textStep, {
                    [styles.isDisabledText]: isDisabled,
                })}
            >
                {content}
            </div>
        </div>
    );
}

export default Stepper;
