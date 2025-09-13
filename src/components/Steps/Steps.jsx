import Stepper from '@components/Steps/Stepper';
import styles from './styles.module.scss';
import cls from 'classnames';

function Steps({ step, className }) {
    const dataSteps = [
        { number: 1, content: 'Giỏ hàng' },
        { number: 2, content: 'Thanh toán' },
        { number: 3, content: 'Kết quả' },
    ];
    return (
        <div className={styles.containerSteps}>
            <div className={styles.steps}>
                {dataSteps.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={cls(styles.stepItem, {
                                [className]: item.number !== step,
                            })}
                        >
                            <Stepper
                                key={index}
                                number={item.number}
                                content={item.content}
                                isDisabled={index + 1 > step}
                            />
                            {index !== dataSteps.length - 1 && (
                                <div
                                    className={cls(styles.line, className)}
                                ></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Steps;
