import styles from '../styles.module.scss';

import moment from 'moment';
import Button from '@components/Button/Button';

function CheckOutTable({
    checkOutTrackings,
    useOrderStatus,
    formatPrice,
    handleNavCheckoutDT,
}) {
    return (
        <div className={styles.checkoutTable}>
            <table>
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Ngày đặt hàng</th>
                        <th>Phương thức</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {checkOutTrackings.length > 0 ? (
                        checkOutTrackings.map(order => (
                            <tr key={order.id}>
                                <td data-label='Mã'>{order.orderCode}</td>
                                <td data-label='Ngày đặt'>
                                    {moment(order.orderDate).format(
                                        'DD-MM-YYYY, h:mm a'
                                    )}
                                </td>
                                <td data-label='Phương thức'>
                                    {order.payment.paymentType.value}
                                </td>
                                <td data-label='Tổng tiền'>
                                    {formatPrice(order.totalAmount)}
                                </td>
                                <td data-label='Trạng thái'>
                                    {useOrderStatus(order.orderStatus)}
                                </td>
                                <td>
                                    <Button
                                        content={'Xem đơn hàng'}
                                        isPrimary={false}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan='5'
                                style={{ textAlign: 'center', padding: '20px' }}
                            >
                                Không có đơn hàng nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CheckOutTable;
