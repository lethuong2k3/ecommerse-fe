import { useEffect, useState } from 'react';
import {
    FaClipboardList,
    FaBoxOpen,
    FaTruck,
    FaHome,
    FaBan,
    FaClock,
} from 'react-icons/fa';
import { orderHistories } from '@apis/orderService';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import cls from 'classnames';

const statusSteps = [
    { key: 'PENDING', label: 'Order Processed', icon: <FaClipboardList /> },
    { key: 'SHIPPED', label: 'Order Shipped', icon: <FaBoxOpen /> },
    { key: 'EN_ROUTE', label: 'Order En Route', icon: <FaTruck /> },
    { key: 'DELIVERED', label: 'Order Arrived', icon: <FaHome /> },
    { key: 'CANCELLED', label: 'Order Cancelled', icon: <FaBan /> },
    { key: 'EXPIRED', label: 'Order Expired', icon: <FaClock /> },
];

function CheckOutDetails() {
    const [histories, setHistories] = useState([]);
    const param = useParams();
    const getStepFromStatus = status => {
        switch (status) {
            case 'PENDING':
            case 'WAITING':
            case 'PAID':
                return statusSteps.findIndex(s => s.key === 'PENDING');
            case 'SHIPPED':
                return statusSteps.findIndex(s => s.key === 'SHIPPED');
            case 'EN_ROUTE':
                return statusSteps.findIndex(s => s.key === 'EN_ROUTE');
            case 'DELIVERED':
                return statusSteps.findIndex(s => s.key === 'DELIVERED');
            case 'CANCELLED':
                return statusSteps.findIndex(s => s.key === 'CANCELLED');
            case 'EXPIRED':
                return statusSteps.findIndex(s => s.key === 'EXPIRED');
            case 'CART':
            default:
                return 0;
        }
    };
    useEffect(() => {
        orderHistories(param.orderCode)
            .then(res => {
                setHistories(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [param]);

    const currentStatus =
        histories?.[histories.length - 1]?.status || 'PENDING';
    const activeIndex = getStepFromStatus(currentStatus);

    return (
        <div className={styles.orderProgress}>
            <div className={styles.progressBar}>
                {statusSteps.map((step, index) => (
                    <div
                        key={step.key}
                        className={cls(styles.step, {
                            [styles.active]: index <= activeIndex,
                        })}
                    >
                        <div className={styles.circle}>
                            {index <= activeIndex ? '✔' : ''}
                        </div>
                        {index < statusSteps.length - 1 && (
                            <div
                                className={cls(styles.line, {
                                    [styles.active]: index < activeIndex,
                                })}
                            ></div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.progressLabels}>
                {statusSteps.map(step => (
                    <div key={step.key} className={styles.label}>
                        <div className={styles.icon}>{step.icon}</div>
                        <p>{step.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CheckOutDetails;
