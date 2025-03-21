import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getAllPaymentTypes } from '@apis/paymentTypeService';
import LoadMore from '@components/Loading/LoadMore';

function PaymentMethods() {
    const [listMethod, setListMethod] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        getAllPaymentTypes()
            .then(res => {
                setListMethod(res.data.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <div className={styles.containerMethods}>
                <div className={styles.titleMethods}>
                    Guaranteed <span>safe</span> checkout
                </div>
                <div className={styles.boxImgMethods}>
                    {isLoading && <LoadMore />}
                    {listMethod.map((item, key) => {
                        return (
                            <img
                                key={key}
                                src={item.imageUrl}
                                alt=''
                                className={styles.imgMethods}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={styles.textSecure}>Your Payment is 100% Secure</div>
        </>
    );
}

export default PaymentMethods;
