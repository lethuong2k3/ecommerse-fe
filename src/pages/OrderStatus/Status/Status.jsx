import Button from '@components/Button/Button';
import styles from '../styles.module.scss';

function Status({ status }) {
    return (
        <>
            {status.icon}
            <h3 className={styles.title}>Payment {status.title}!</h3>
            <p>{status.description}</p>
            <p>{status.text}</p>
            {status.title === 'Failed' ? (
                <Button content={'TRY AGAIN'} />
            ) : (
                <Button content={'CONTINUE SHOPPING'} />
            )}
        </>
    );
}

export default Status;
