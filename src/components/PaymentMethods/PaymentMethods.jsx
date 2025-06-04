import { useContext, useState } from 'react';
import styles from './styles.module.scss';
import LoadMore from '@components/Loading/LoadMore';
import { PaymentMethodsContext } from '@contexts/PaymentMethodsProvider';

function PaymentMethods() {
    const { listMethod, isLoading } = useContext(PaymentMethodsContext);

    return (
        <>
            <div className={styles.containerMethods}>
                <div className={styles.titleMethods}>
                    Thanh toán <span>bảo mật</span>
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
            <div className={styles.textSecure}>
                Thanh toán của bạn an toàn 100%
            </div>
        </>
    );
}

export default PaymentMethods;
