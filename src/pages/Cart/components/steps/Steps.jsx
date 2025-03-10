import Stepper from '@pages/Cart/components/steps/Stepper';
import styles from '../../styles.module.scss';

function Steps({ step }) {
    const dataSteps = [
        { number: 1, content: 'Shopping cart' },
        { number: 2, content: 'Checkout' },
        { number: 3, content: 'Order status' },
    ];
    return (
        <div className={styles.containerSteps}>
            <div className={styles.steps}>
                {dataSteps.map((item, index) => {
                    return (
                        <div key={index} className={styles.stepItem}>
                            <Stepper
                                key={index}
                                number={item.number}
                                content={item.content}
                                isDisabled={index + 1 > step}
                            />
                            {index !== dataSteps.length - 1 && (
                                <div className={styles.line}></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Steps;
