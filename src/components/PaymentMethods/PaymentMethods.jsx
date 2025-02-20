import styles from './styles.module.scss';

function PaymentMethods() {
    const srcMethods = [
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/visa.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/master-card.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/paypal.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/american-express.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/maestro.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/bitcoin.jpeg',
    ];
    return (
        <>
            <div className={styles.containerMethods}>
                <div className={styles.titleMethods}>
                    Guaranteed <span>safe</span> checkout
                </div>
                <div className={styles.boxImgMethods}>
                    {srcMethods.map((src, key) => {
                        return (
                            <img
                                key={key}
                                src={src}
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
