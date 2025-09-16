import { dataMenu } from '@components/Footer/constants';
import styles from './styles.module.scss';
import Logo from '@images/Logo.png';
import { useContext } from 'react';
import { PaymentMethodsContext } from '@contexts/PaymentMethodsProvider';
import LoadMore from '@components/Loading/LoadMore';

function MyFooter() {
    const { listMethod, isLoading } = useContext(PaymentMethodsContext);
    return (
        <div className={styles.container}>
            <div>
                <img
                    className={styles.logo}
                    src={Logo}
                    alt=''
                    width={120}
                    height={120}
                />
            </div>
            <div className={styles.boxNav}>
                {dataMenu.map((item, key) => (
                    <div key={key}>{item.content}</div>
                ))}
            </div>
            <div>
                <p style={{ textAlign: 'center' }}>
                    Thanh toán an toàn và bảo mật
                </p>
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
            <div
                className={styles.copyRight}
                style={{ textAlign: 'center', marginTop: '20px' }}
            >
                Copyright © 2024 Fpoly Clothes. Created by
                leanhthuong2k3@gmail.com – Website E-commerce.
            </div>
        </div>
    );
}

export default MyFooter;
