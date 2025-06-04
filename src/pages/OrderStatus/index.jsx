import Header from '@components/Header/Header';
import Steps from '@components/Steps/Steps';
import styles from './styles.module.scss';
import MainLayout from '@components/Layout/Layout';
import { FaCheckCircle } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Status from '@pages/OrderStatus/Status/Status';
import MyFooter from '@components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { momoIpn } from '@apis/momoService';

function OrderStatus() {
    const [status, setStatus] = useState({});
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get('orderId');
        const requestId = searchParams.get('requestId');
        momoIpn(orderId, requestId)
            .then(res => {
                if (res.status === 200) {
                    return handleOrderStatus(res.status);
                }
            })
            .catch(err => {
                if (err.status === 400) {
                    return handleOrderStatus(err.status);
                }
            });
    }, [location.search]);
    const handleOrderStatus = value => {
        const statusMap = {
            200: {
                title: 'Done',
                icon: <FaCheckCircle size={64} color='#16A34A' />,
                description:
                    'Thank you for completing your secure online payment.',
                text: 'Have a great day!',
            },
            400: {
                title: 'Failed',
                icon: <IoCloseCircle size={64} color='#DC2626' />,
                description:
                    'Unfortunately, your payment could not be processed.',
                text: 'Please try again or use a different payment method.',
            },
        };

        setStatus(statusMap[value] || {});
    };

    return (
        <>
            <Header />
            <Steps className={styles.resPhoneTablet} step={3} />
            <MainLayout>
                <div className={styles.container}>
                    <Status status={status} />
                </div>
            </MainLayout>
            <MyFooter />
        </>
    );
}

export default OrderStatus;
