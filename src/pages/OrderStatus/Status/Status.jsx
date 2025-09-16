import Button from '@components/Button/Button';
import styles from '../styles.module.scss';

function Status({
    status,
    handleNavigateToShop,
    handleNavigateToOrderTracking,
}) {
    return (
        <>
            {status.icon}
            <h3 className={styles.title}>Thanh toán {status.title}!</h3>
            <p>{status.description}</p>
            <p>{status.text}</p>
            {status.title === 'Failed' ? (
                <Button content={'Thử lại'} />
            ) : (
                <>
                    <Button
                        content={'Tiếp tục mua sắm'}
                        onClick={() => handleNavigateToShop()}
                    />
                    <Button
                        content={'Danh sách đơn hàng'}
                        onClick={() => handleNavigateToOrderTracking()}
                        isPrimary={false}
                        style={{ marginTop: '10px' }}
                    />
                </>
            )}
        </>
    );
}

export default Status;
