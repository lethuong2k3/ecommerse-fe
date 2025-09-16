import Header from '@/components/header/header';
import Steps from '@/components/steps/steps';
import styles from './styles.module.scss';
import MainLayout from '@/components/layout/layout';
import { FaCheckCircle } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Status from '@/pages/order-status/status/status';
import MyFooter from '@/components/footer/footer';
import { useLocation, useNavigate } from 'react-router-dom';

function OrderStatus() {
    const [status, setStatus] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
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
    const handleNavigateToShop = () => {
        navigate('/shop');
    };
    const handleNavigateToOrderTracking = () => {
        navigate('/danh-sach-don-hang');
    };
    const handleOrderStatus = value => {
        const statusMap = {
            200: {
                title: 'thành công',
                icon: <FaCheckCircle size={64} color='#16A34A' />,
                description: 'Cảm ơn bạn đã mua sản phẩm của chúng tôi.',
                text: 'Chúc bạn có một ngày vui vẻ!',
            },
            400: {
                title: 'thất bại',
                icon: <IoCloseCircle size={64} color='#DC2626' />,
                description: 'Rất tiếc, thanh toán của bạn không thành công.',
                text: 'Vui lòng thử lại hoặc sử dụng phương thức thanh toán khác.',
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
                    <Status
                        status={status}
                        handleNavigateToShop={handleNavigateToShop}
                        handleNavigateToOrderTracking={
                            handleNavigateToOrderTracking
                        }
                    />
                </div>
            </MainLayout>
            <MyFooter />
        </>
    );
}

export default OrderStatus;
