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
    province,
    district,
    ward,
    getData,
    deleteItem,
    isLoadingCart,
    listMethods,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
    subTotal,
    fee,
    errSelect,
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

    return (
        <div className={styles.containerCheckOut}>
            <form
                onSubmit={formik.handleSubmit}
                style={{ display: 'contents' }}
            >
                <div className={styles.first}>
                    <h3 className={styles.titleStep}>CHI TIẾT ĐƠN HÀNG</h3>
                    <div className={styles.inputGroup}>
                        <InputCommon
                            id='firstName'
                            label={'Họ'}
                            type={'text'}
                            isRequired
                            formik={formik}
                            borderErr
                            placeholder='Họ'
                        />
                        <InputCommon
                            id='lastName'
                            label={'Tên'}
                            type={'text'}
                            isRequired
                            formik={formik}
                            borderErr
                            placeholder='Tên'
                        />
                    </div>
                    <InputCommon
                        id='streetAddress'
                        label={'Địa chỉ'}
                        type={'text'}
                        formik={formik}
                        borderErr
                        placeholder='Địa chỉ'
                        isRequired
                    />
                    <label>Tỉnh / TP</label>
                    <div
                        style={{
                            border: errSelect('provinceID')
                                ? '1px solid #c62828'
                                : '',
                            margin: '5px 0px 15px 0px',
                        }}
                    >
                        <SelectSearch
                            options={province?.map(p => ({
                                name: p.ProvinceName,
                                value: Number(p.ProvinceID),
                            }))}
                            name='provinceID'
                            placeholder='Tỉnh / TP'
                            search
                            value={formik.values.provinceID}
                            onChange={value => handleProvinceChange(value)}
                            onBlur={() =>
                                formik.setFieldTouched('provinceID', true)
                            }
                        />
                    </div>

                    <label>Quận / Huyện</label>
                    <div
                        style={{
                            border: errSelect('districtID')
                                ? '1px solid #c62828'
                                : '',
                            margin: '5px 0px 15px 0px',
                        }}
                    >
                        <SelectSearch
                            options={district?.map(d => ({
                                name: d.DistrictName,
                                value: Number(d.DistrictID),
                            }))}
                            name='districtID'
                            placeholder='Quận / Huyện'
                            search
                            value={formik.values.districtID}
                            onChange={value => handleDistrictChange(value)}
                            onBlur={() =>
                                formik.setFieldTouched('districtID', true)
                            }
                        />
                    </div>
                    <label>Phường / Xã</label>
                    <div
                        style={{
                            border: errSelect('wardID')
                                ? '1px solid #c62828'
                                : '',
                            margin: '5px 0px 15px 0px',
                        }}
                    >
                        <SelectSearch
                            options={ward?.map(w => ({
                                name: w.WardName,
                                value: Number(w.WardCode),
                            }))}
                            name='wardID'
                            placeholder='Phường / Xã'
                            search
                            value={formik.values.wardID}
                            onChange={value => handleWardChange(value)}
                            onBlur={() =>
                                formik.setFieldTouched('wardID', true)
                            }
                        />
                    </div>
                    <InputCommon
                        id='phone'
                        label={'Số điện thoại'}
                        type={'number'}
                        formik={formik}
                        borderErr
                        isRequired
                        placeholder='Số điện thoại'
                    />
                    <InputCommon
                        id='email'
                        label={'Email'}
                        type={'text'}
                        formik={formik}
                        borderErr
                        isRequired
                        placeholder='Email'
                    />
                    <h3 className={styles.titleStep}>Thông tin bổ sung</h3>
                    <InputCommon
                        id='orderComment'
                        label={'Lời nhắn'}
                        type={'textarea'}
                        formik={formik}
                        placeholder='Ghi chú thêm (Ví dụ: Giao hàng giờ hành chính)'
                    />
                </div>
                <div className={styles.last}>
                    <h3 className={styles.titleStep}>Thanh toán</h3>
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
                                                    Màu sắc:
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
                                                    xóa
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className={styles.footShopTable}>
                                <div className={styles.cartSubtotal}>
                                    Tổng tiền hàng:
                                    <span>{formatPrice(subTotal)}</span>
                                </div>
                                <div className={styles.cartSubtotal}>
                                    Phí ship: <span>{formatPrice(fee)}</span>
                                </div>
                                <div className={styles.orderTotal}>
                                    Cần thanh toán:
                                    <span>{formatPrice(subTotal + fee)}</span>
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
                                                <label
                                                    htmlFor={
                                                        `method_` + item.value
                                                    }
                                                >
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
