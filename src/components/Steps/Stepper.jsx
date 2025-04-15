import styles from './styles.module.scss';
import cls from 'classnames';

function Stepper({ number, content, isDisabled }) {
    return (
        <div className={styles.stepper}>
            <div
                className={cls(styles.numberStep, {
                    [styles.isDisableNumber]: isDisabled,
                })}
            >
                {number}
            </div>
            <div
                className={cls(styles.textStep, {
                    [styles.isDisableText]: isDisabled,
                })}
            >
                {content}
            </div>
        </div>
    );
}

export default Stepper;
