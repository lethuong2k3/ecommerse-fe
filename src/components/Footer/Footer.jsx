import { dataMenu } from '@components/Footer/constants';
import styles from './styles.module.scss';
import Logo from '@images/Logo.png';
import TypePayment from '@images/type-payment.png';

function MyFooter() {
    return (
        <div className={styles.container}>
            <div>
                <img src={Logo} alt='' width={120} height={120} />
            </div>
            <div className={styles.boxNav}>
                {dataMenu.map((item, key) => (
                    <div key={key}>{item.content}</div>
                ))}
            </div>
            <div>
                <p style={{ textAlign: 'center' }}>Guaranteed safe checkout</p>
                <img src={TypePayment} alt='' />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                Copyright © 2024 Fpoly Clothes. Created by
                leanhthuong2k3@gmail.com – Website E-commerce.
            </div>
        </div>
    );
}

export default MyFooter;
