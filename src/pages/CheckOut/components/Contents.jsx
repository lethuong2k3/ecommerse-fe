import cls from 'classnames';
import Button from '@components/Button/Button';
import PaymentMethods from '@components/PaymentMethods/PaymentMethods';
import QuantitySelector from '@components/QuantitySelector/QuantitySelector';
import SelectSearch from 'react-select-search';
import InputCommon from '@components/InputCommon/InputCommon';
import styles from '../styles.module.scss';
import Loading from '@components/Loading/Loading';
import { formatPrice } from '@hooks/useFomatPrice';

function Contents({
    payment,
    setPayment,
    listProductCart,
    formik,
    dataCountry,
    getData,
    deleteItem,
    isLoadingCart,
    listMethods,
}) {
    const increment = (orderItemId, quantity, item) => {
        if (quantity < item.productDetail.amount) {
            getData(orderItemId, { quantity: +quantity + 1 });
        }
    };
    const decrement = (orderItemId, quantity) => {
        if (quantity <= 1) {
            return;
        }
        getData(orderItemId, { quantity: +quantity - 1 });
    };
    const subTotal = listProductCart?.reduce((acc, item) => {
        return acc + item.totalPrice;
    }, 0);
    const isErr = formik.touched.country && formik.errors.country;
    return (
        <div className={styles.containerCheckOut}>
            <form
                onSubmit={formik.handleSubmit}
                style={{ display: 'contents' }}
            >
                <div className={styles.first}>
                    <h3 className={styles.titleStep}>BILLING DETAILS</h3>
                    <div className={styles.inputGroup}>
                        <InputCommon
                            id='firstName'
                            label={'First Name'}
                            type={'text'}
                            isRequired
                            formik={formik}
                            borderErr
                            placeholder='First Name'
                        />
                        <InputCommon
                            id='lastName'
                            label={'Last Name'}
                            type={'text'}
                            isRequired
                            formik={formik}
                            borderErr
                            placeholder='Last Name'
                        />
                    </div>
                    <InputCommon
                        id='companyName'
                        label={'Company Name (optional)'}
                        type={'text'}
                        formik={formik}
                        borderErr
                        placeholder='Company Name'
                    />
                    <label>Country / Region *</label>
                    <div
                        style={{
                            border: isErr ? '1px solid #c62828' : '',
                            margin: '5px 0px 15px 0px',
                        }}
                    >
                        <SelectSearch
                            options={dataCountry}
                            name='country'
                            placeholder='Select Country'
                            search
                            value={formik.values.country}
                            onChange={value =>
                                formik.setFieldValue('country', value)
                            }
                            onBlur={() =>
                                formik.setFieldTouched('country', true)
                            }
                        />
                    </div>
                    <InputCommon
                        id='streetAddress'
                        label={'Street address'}
                        type={'text'}
                        formik={formik}
                        borderErr
                        placeholder='House number and street name'
                        isRequired
                    />
                    <InputCommon
                        id='billingAddress'
                        type={'text'}
                        formik={formik}
                        borderErr
                        placeholder='Apartment, suite, unit, etc. (optional)'
                    />
                    <InputCommon
                        id='state'
                        label={'State'}
                        type={'text'}
                        formik={formik}
                        borderErr
                        isRequired
                    />
                    <InputCommon
                        id='billingCity'
                        label={'Town / City'}
                        type={'text'}
                        formik={formik}
                        borderErr
                        isRequired
                    />
                    <InputCommon
                        id='zipcode'
                        label={'Zip code'}
                        type={'text'}
                        formik={formik}
                        borderErr
                        isRequired
                    />
                    <InputCommon
                        id='phone'
                        label={'Phone'}
                        type={'number'}
                        formik={formik}
                        borderErr
                        isRequired
                        placeholder='Phone'
                    />
                    <InputCommon
                        id='email'
                        label={'Email Address'}
                        type={'text'}
                        formik={formik}
                        borderErr
                        isRequired
                        placeholder='Email Address'
                    />
                    <h3 className={styles.titleStep}>Additional Information</h3>
                    <InputCommon
                        id='orderComment'
                        label={'Order Notes (optional)'}
                        type={'textarea'}
                        formik={formik}
                        placeholder='Notes about your order, e.g. special notes for delivery.'
                    />
                </div>
                <div className={styles.last}>
                    <h3 className={styles.titleStep}>Your order</h3>
                    {isLoadingCart == true ? (
                        <Loading />
                    ) : (
                        <>
                            <div className={styles.products}>
                                {listProductCart?.map((item, index) => {
                                    return (
                                        <div
                                            className={styles.shopTable}
                                            key={index}
                                        >
                                            <img src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg' />
                                            <div className={styles.productInfo}>
                                                <div
                                                    className={
                                                        styles.productName
                                                    }
                                                >
                                                    {
                                                        item.productDetail
                                                            .product.name
                                                    }
                                                </div>
                                                <div
                                                    className={
                                                        styles.productPriceQty
                                                    }
                                                >
                                                    <QuantitySelector
                                                        increment={increment}
                                                        decrement={decrement}
                                                        item={item}
                                                        quantity={item.quantity}
                                                        productDetail={
                                                            item.productDetail
                                                        }
                                                        productDetailCart={item}
                                                    />
                                                    <span>x</span>
                                                    <span
                                                        className={styles.price}
                                                    >
                                                        {formatPrice(
                                                            item.productDetail
                                                                .price
                                                        )}
                                                    </span>
                                                </div>
                                                <div
                                                    className={styles.variation}
                                                >
                                                    Size:
                                                    <span>
                                                        {
                                                            item.productDetail
                                                                .size.name
                                                        }
                                                    </span>
                                                </div>
                                                <div
                                                    className={styles.variation}
                                                >
                                                    Color:
                                                    <span>
                                                        {
                                                            item.productDetail
                                                                .color.name
                                                        }
                                                    </span>
                                                </div>
                                                <div
                                                    className={
                                                        styles.productRemove
                                                    }
                                                    onClick={() =>
                                                        deleteItem(item.id)
                                                    }
                                                >
                                                    Remove
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className={styles.footShopTable}>
                                <div className={styles.cartSubtotal}>
                                    Subtotal:{' '}
                                    <span>{formatPrice(subTotal)}</span>
                                </div>
                                <div className={styles.orderTotal}>
                                    Total: <span>{formatPrice(subTotal)}</span>
                                </div>
                            </div>
                            <div className={styles.paymentMethods}>
                                {listMethods.map(item => {
                                    return (
                                        <div
                                            className={styles.boxPaymentMethods}
                                            key={item.id}
                                        >
                                            <input
                                                id={`method_` + item.value}
                                                type='radio'
                                                name='payment_method'
                                                value={item.id}
                                                checked={payment === item.id}
                                                onChange={e =>
                                                    setPayment(item.id)
                                                }
                                            />
                                            <div
                                                className={
                                                    styles.boxPaymentMethod
                                                }
                                            >
                                                <label htmlFor='method_cheque'>
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.value}
                                                    />
                                                </label>
                                                <div
                                                    className={cls(
                                                        styles.paymentDes,
                                                        {
                                                            [styles.paymentDesActive]:
                                                                payment ===
                                                                item.id,
                                                        }
                                                    )}
                                                >
                                                    {`${item.value}: ${item.description}`}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                <Button
                                    content={'PLACE ORDER'}
                                    style={{ width: '100%', marginTop: '10px' }}
                                />
                                <PaymentMethods />
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Contents;
